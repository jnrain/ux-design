#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import unicode_literals, division

from weiyu.shortcuts import inject_app
from weiyu.utils.server import cli_server

inject_app(conf_path='conf.yml')


if __name__ == '__main__':
    cli_server('cherrypy')


# vim:set ai et ts=4 sw=4 sts=4 fenc=utf-8:
