# WireGuard Peer Editor
This is a small web project meant to help setup WireGuard peers. I got tired of doing this in the command line and decided to make a small portfolio project out of my troubles :)

*Note: This repo only works on __Debian-based distros__ that use the APT package manager. I am looking to add cross-platform support in the future*

## Setup Instructions - Directly on Server
1. Clone the repository

`git clone https://github.com/rcsadlerfan/WG-WebInterface.git`

2. Run the install script

`sudo ./install.sh`

3. Create a .env file and add the following variables

```
PORT=<PORT_NUMBER>
WG_CONFIG_PATH=</path/to/wg.conf>
```

4. Run the server

`npm run start`

*Working on implementing this*

## Setup Instructions - Docker
*Future release*