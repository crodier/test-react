#include "uWS/uWS.h"
#include <iostream>

#include <vector>
#include <fstream>
#include <iostream>
#include <sstream>

std::vector<std::string> storedMessages;
std::vector<int> excludedMessages;
std::stringstream indexHtml;
std::string pidString;
int connections = 0;

int getKb() {
    std::string line;
    std::ifstream self("/proc/self/status");
    int vmData, vmStk, vmPte;
    while(!self.eof()) {
        std::getline(self, line, ':');
        if (line == "VmPTE") {
            self >> vmPte;
        } else if (line == "VmData") {
            self >> vmData;
        } else if (line == "VmStk") {
            self >> vmStk;
        }
        std::getline(self, line);
    }
    return vmData - vmStk - vmPte;
}


int main() {
    uWS::Hub h;

    std::cout << "Starting serverrr on 9999" << std::endl;

    int correctStrings = 0;

    h.onMessage([&h](uWS::WebSocket<uWS::SERVER> *ws, char *message, size_t length, uWS::OpCode opCode) {
        std::cout << "Message: " << message << std::endl;
        ws->send(message, length, opCode);
    });

    h.onConnection([&correctStrings](uWS::WebSocket<uWS::CLIENT> *ws, uWS::HttpRequest req) {
        if (req.getHeader("sec-websocket-protocol").toString() == "someSubProtocolHere") {
            correctStrings++;
        }
        // ws->close();
    });

    h.onConnection([&correctStrings](uWS::WebSocket<uWS::SERVER> *ws, uWS::HttpRequest req) {
        if (req.getHeader("sec-websocket-protocol").toString() == "someSubProtocolHere") {
            correctStrings++;
        }

        if (req.getHeader("some-random-header").toString() == "someRandomValue") {
            correctStrings++;
        }

        if (req.getUrl().toString() == "/somePathHere") {
            correctStrings++;
        }
    });

    h.onDisconnection([&h](uWS::WebSocket<uWS::SERVER> *ws, int code, char *message, size_t length) {
        // h.getDefaultGroup<uWS::SERVER>().close();

    });


    h.listen(9999);
    h.connect("ws://localhost:9999/somePathHere", nullptr, {{"sec-websocket-protocol", "someSubProtocolHere"}, {"some-random-header", "someRandomValue"}});

    h.run();

    /*
    if (correctStrings != 4) {
        std::cout << "FAILURE: incorrect paths or subprotocols " << correctStrings << std::endl;
        exit(-1);
    } else {
        std::cout << "testRouting passed, falling through" << std::endl;
    }
     */
}

