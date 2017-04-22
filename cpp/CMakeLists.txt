cmake_minimum_required(VERSION 2.8.9)
set (CMAKE_CXX_STANDARD 11)

set (CMAKE_BUILD_TYPE Debug)
# SET(CMAKE_CXX_FLAGS_DISTRIBUTION -O0")
set(CMAKE_CXX_FLAGS_DEBUG "-g -Wall")
set(CMAKE_CXX_FLAGS_RELEASE "-g -Wall")

set(CMAKE_CXX_FLAGS "-g -Wall")

MESSAGE( STATUS "CMAKE_CXX_FLAGS: " ${CMAKE_CXX_FLAGS} )

project (server)

INCLUDE_DIRECTORIES(/usr/include/uWS)
# libuWS is installed in /usr/lib
# LINK_DIRECTORIES(/usr/lib /lib/x86_64-linux-gnu)

add_executable(server server.cpp)
target_link_libraries(server pthread uWS z ssl uv)


#
# $(CXX) $(CPP_OPENSSL_OSX) -std=c++11 -O3 tests/main.cpp -Isrc -o testsBin -lpthread -luWS -lssl -lcrypto -lz -luv
