# RapidOcr-Java

> 此项目已经在github上开源，[点击前往查看最新动态](https://github.com/MyMonsterCat/RapidOcr-Java)

## 😺 项目起源

- 现有的JavaOCR工具包识别效果差强人意，PaddleOCR在实现前沿算法的基础上，考虑精度与速度的平衡，进行模型瘦身和深度优化，使其尽可能满足产业落地需求。
- PaddleOCR官方并未提供Java版本，而[RapidOcr](https://github.com/RapidAI/RapidOCR)解决了这个问题，其提供了Kotlin和Java混合版本的[Demo-onnx](https://github.com/RapidAI/RapidOcrOnnxJvm)和[Demo-ncnn](https://github.com/RapidAI/RapidOcrNcnnJvm)

- 而实际使用过程中
  - 项目中并不想再引入Kotlin
  - 不想了解OCR相关知识，开箱即用
  - 不想额外再部署OCR服务


因此本项目将Kotlin部分移除，并在此基础上加以完善且提供了更友好的的调用方法，更方便java开发者直接进行使用。

## 👏 项目特点

- 纯Java代码调用RapidOcr
- 使用ncnn和onnx推理引擎方式，并编写了简单工具类，默认使用Onnx推理方式
- 均使用CPU版本，GPU版本请自行编译

> ⚠️ 注意：当前JVM启动时**只能同时启动一种推理引擎**，以第一次调用runOcr方法时的引擎配置为准