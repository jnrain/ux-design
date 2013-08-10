# 听雨用户体验设计

## 简介

这里存放江南听雨站的用户体验设计稿，主要就是各种网页的设计。


## 授权

此项目采用 cc-by-nc-sa 3.0 中国大陆许可协议。


## 观看方法

### 已有微雨开发环境

```sh
# 激活你的微雨开发环境
# Windows 用户自己把最前面那个 . 去掉, 还有路径分隔符
. path/to/your/virtualenv/bin/activate

# 启动服务进程
./wsgiapp.py

# 打开 http://127.0.0.1:9090/index.html 即可
```


### 没有微雨开发环境

你有两个选择:

* 去看[听雨部署好的 master 分支](http://staging.jnrain.com/ux-design/index.html);
* 自己架一个开发环境, 然后就化归到了前一种情况.

微雨环境的架设方法:

```sh
# 同样无视了 Windows 用户
# 你们在安装微雨的依赖的时候需要 VS2008 编译器和各种预先准备好的库, 否则
# pip 基本上一定会在编译 C 扩展的时候悲剧. 鉴于这种原因, 如果你还是准备接着
# 用 Windows 开发的话, 请跳过 pip install 一行而在虚拟环境内手工安装
# requirements.txt 列出的软件包.
# 不是所有包都会被用到, 至少需要以下几个:
#
# decorator
# ply
# cherrypy
# PyYAML (有 C 扩展)
# pyScss (有 C 扩展)
#
# 有 C 扩展的包自己一个一个装上, 其他的可以用 pip 装. 祝你们好运.

# 假设你机器上已经有了 virtualenv, 这行可以跳过. 如果没有:
pip install virtualenv

# 在别处方便的地方建立虚拟环境, 名字随便取 (别用汉字, 谢谢)
# 这里用 vv 为例
# 注意你的工作目录应该在你打算存放虚拟环境的地方, 不是这个版本库
virtualenv vv

# 进入虚拟环境
. vv/bin/activate

# 拉下微雨开发版并安装
git clone https://github.com/xen0n/weiyu.git
cd weiyu
./setup.py develop

# 依赖关系, 一站配齐
# PyPy 用户: 把 requirements.txt 换成 requirements.pypy.txt
pip install -r requirements.txt
```


<!-- vim:set ai et ts=4 sw=4 sts=4 fenc=utf-8: -->
