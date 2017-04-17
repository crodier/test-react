using HttpServer
using WebSockets

wsh = WebSocketHandler() do req,client
    while true
        msg = read(client)
        print(String(msg))
        write(client, String(msg))
    end
  end

server = Server(wsh)
run(server,9090)
