#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import unicode_literals, division

from weiyu.shortcuts import inject_app
from weiyu.utils.server import cli_server

inject_app(conf_path='conf.yml')


if __name__ == '__main__':
    # make port number the same as Python's SimpleHTTPServer
    cli_server('cherrypy', port=8000)


# vim:set ai et ts=4 sw=4 sts=4 fenc=utf-8:
