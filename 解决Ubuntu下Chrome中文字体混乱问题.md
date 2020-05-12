> 背景：公司产品的终端系统为 Ubuntu，用户操作都在 Chrome 浏览器上完成。但是界面上的一些中文字体出现了黑体和楷体混杂的情况，非常不美观。
>
> 目标：统一界面显示字体。

通过 research，目前网上的主要方案有：1.删楷体+改系统字体 2.设置里改字体。 3.启动器的命令里加上”-disable-tabbed-options”，在任意输入框右键拼写检查选项。这三种方式。

验证了前两种方案，确实有效，但因为已有产品售出，所以放弃这些方案。

而第三种方式过于生硬，且同样不符合需求，未实践验证。

##  1. 为 Ubuntu 安装新字体

网页没有指定字体时，浏览器将调用系统默认字体配置。

1. 安装文泉驿字体：

   ```bash
   sudo apt-get install ttf-wqy*
   ```

2. 编辑字体设置

   ```bash
   sudo gedit /etc/fonts/conf.avail/69-language-selector-zh-cn.conf
   ```

然后在该文件里可以设置字体的优先级，最后重启电脑使配置生效。

[在linux中安装/卸载字体](http://blog.wentong.me/2014/05/add-fonts-to-your-linux/)


## 2. 设置浏览器字体

Linux 下的 chromium（chrome）默认字体并不继承系统字体。

无法在浏览器配置项里选择通用字体，所以选择直接更改配置项的源文件`~/.config/chromium/Default/Preferences`

（这个是chromium的目录，chrome理论上把chromium改为chrome即可）

1. 关闭所有正在运行的chromium（chrome），vim 打开配置文件并编辑。

`shift+g`转到文件末尾处 ：

```basic
"webkit": { "webprefs": { "global": { "fixed_font_family": "monospace", "sansserif_font_family": "scans", "serif_font_family": "scans-serif", "standard_font_family": "scans" }, "uses_universal_detector": true } } 
```

根据需要重新设置字体集及优先级。

## 3. 在项目中设置自定义字体集

其实，最普适的方案就是用`font-face`引入自定义字体。将使用的字体文件传到服务器上，用`font-face`加载到网页中。

[真正了解CSS3背景下的@font face规则](https://www.zhangxinxu.com/wordpress/2017/03/css3-font-face-src-local/)

而更简单一点是使用现有字体，但要考虑`font-family`的字体应用顺序，尽量不要出现字体未匹配，降级后显示效果特别差的情况。

[如何保证网页的字体在各平台都尽量显示为最高质量的黑体？](https://www.zhihu.com/question/19911793)

[Fonts.css -- 跨平台中文字体解决方案](https://zenozeng.github.io/fonts.css/)

**最终采用的方案：**

- 最开始使用了上面的`fonts.css`库，但后来发现其实项目中最后引用的`fonts.css/dist/fonts.css`里其实就是几个指定了字体集的`class`。

```css
.font-hei {
    font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
}
.font-kai {
    font-family: Baskerville, Georgia, "Liberation Serif", "Kaiti SC", STKaiti, "AR PL UKai CN", "AR PL UKai HK", "AR PL UKai TW", "AR PL UKai TW MBE", "AR PL KaitiM GB", KaiTi, KaiTi_GB2312, DFKai-SB, "TW\-Kai", serif;
}
.font-song {
    font-family: Georgia, "Nimbus Roman No9 L", "Songti SC", "Noto Serif CJK SC", "Source Han Serif SC", "Source Han Serif CN", STSong, "AR PL New Sung", "AR PL SungtiL GB", NSimSun, SimSun, "TW\-Sung", "WenQuanYi Bitmap Song", "AR PL UMing CN", "AR PL UMing HK", "AR PL UMing TW", "AR PL UMing TW MBE", PMingLiU, MingLiU, serif;
}
.font-fang-song {
    font-family: Baskerville, "Times New Roman", "Liberation Serif", STFangsong, FangSong, FangSong_GB2312, "CWTEX\-F", serif;
}
```

- 对上面的几种`font-family`进行验证，效果最好的是`.font-hei`。
- 所以最终，是在项目的全局 css 样式中加入了该字体集。

```css
*{
    font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
}
```

hai， 调研了半天，最后发现，其实解决方式很简单嘛😜