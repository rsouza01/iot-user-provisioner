# IoT User Provisioner

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Github Action - Tests](https://github.com/IoT-Stuff/iot-user-provisioner/actions/workflows/pipeline.yml/badge.svg)](https://github.com/IoT-Stuff/iot-user-provisioner/actions/workflows/pipeline.yml)
[![Build Status](https://travis-ci.com/IoT-Stuff/iot-user-provisioner.svg?branch=master)](https://travis-ci.com/IoT-Stuff/iot-user-provisioner)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=IoT-Stuff_iot-user-provisioner&metric=alert_status)](https://sonarcloud.io/dashboard?id=IoT-Stuff_iot-user-provisioner)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FIoT-Stuff%2Fiot-user-provisioner.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FIoT-Stuff%2Fiot-user-provisioner?ref=badge_shield)

## OS Dependencies

```sh
sudo apt-get install netcat
```

## Install

In order to start using the application, the secrets should be decrypted, running the following command (after exporting ENCRYPTION_KEY):

```sh
export ENCRYPTION_KEY=<key-value>
npm run secrets:decrypt
npm install
```

## Usage


```sh
npm run start
```

## Tests

```sh
npm run tests:unit
npm run tests:integration
```

For a full end to end test, 

```sh
npm run tests:e2e-container
```

## Author

👤 **Rodrigo de Souza**

* Website: http://www.rodrigosouza.net.br
* Github: [@rsouza01](https://github.com/rsouza01)
* LinkedIn: [@rsouza01](https://linkedin.com/in/rsouza01)

## Show your support

Give a ⭐️ if this project helped you!

## Contributions

[![](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/images/0)](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/links/0)[![](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/images/1)](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/links/1)[![](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/images/2)](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/links/2)[![](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/images/3)](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/links/3)[![](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/images/4)](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/links/4)[![](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/images/5)](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/links/5)[![](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/images/6)](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/links/6)[![](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/images/7)](https://sourcerer.io/fame/rsouza01/IoT-Stuff/iot-user-provisioner/links/7)



## References
* Travis CICD: https://boneskull.com/mocha-and-travis-ci-build-stages/

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FIoT-Stuff%2Fiot-user-provisioner.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FIoT-Stuff%2Fiot-user-provisioner?ref=badge_large)
