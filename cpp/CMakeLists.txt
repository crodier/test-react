cmake_minimum_required(VERSION 2.8.9)
set (CMAKE_CXX_STANDARD 11)

set(CMAKE_CXX_FLAGS "-g -Wall")

MESSAGE( STATUS "CMAKE_CXX_COMPILER: " ${CMAKE_CXX_COMPILER} )
MESSAGE( STATUS "CMAKE_CXX_FLAGS: " ${CMAKE_CXX_FLAGS} )

project (server)

# installed uWS here, by build and making as root
INCLUDE_DIRECTORIES(/usr/include/uWS)

add_executable(server server.cpp)

# libraries needed by uWS
target_link_libraries(server pthread uWS z ssl uv)


#
# $(CXX) $(CPP_OPENSSL_OSX) -std=c++11 -O3 tests/main.cpp -Isrc -o testsBin -lpthread -luWS -lssl -lcrypto -lz -luv
