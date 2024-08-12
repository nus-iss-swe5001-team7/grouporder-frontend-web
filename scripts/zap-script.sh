#!/bin/bash

# docker pull softwaresecurityproject/zap-stable:latest
# docker run -i softwaresecurityproject/zap-stable:latest zap-baseline.py -g gen.conf -r testreport.html -t "http://42.61.222.188:15975/" -l PASS > zap_baseline_report.html

# echo $? > /dev/null
# https://www.zaproxy.org/docs/docker/about/

# docker pull --platform linux/amd64 owasp/zap2docker-stable
# docker run -i owasp/zap2docker-stable zap-baseline.py -g gen.conf -r testreport.html -t "http://42.61.222.188:15975/" -l PASS > zap_baseline_report.html

# echo $? > /dev/null