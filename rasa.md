## 文章结构：
1、相关自然语言处理知识背景介绍
2、Rasa是什么
3、Rasa怎么用

### 一、自然语言处理：对话系统

对话系统按功能来划分的话，分为闲聊型、任务型、知识问答型和推荐型。
我们以任务型对话作为切入点。

#### - 任务型多轮对话：

什么是任务型多轮对话？
**用户带着明确的目的而来，希望得到满足特定限制条件的信息或服务**，例如：订餐，订票，寻找音乐、电影或某种商品，等等。因为用户的需求可以比较复杂，可能**需要分多轮进行陈述**，用户也可能在对话过程中不断修改或完善自己的需求。此外，**当用户的陈述的需求不够具体或明确的时候，机器也可以通过询问、澄清或确认来帮助用户找到满意的结果**。



![消毒任务](https://upload-images.jianshu.io/upload_images/23954681-591706394d96ff44.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



假如现在我想实现一个关于消毒任务的多轮对话，看上面的几个例子，实现多轮对话最重要是要解决什么问题？**Bot如何对当前提出的问题进行回复。**



>题外话：对话的回复可以分为生成式和检索式。
>**检索式回复**：会从一堆有限的事先编写好的action中选择一个最合理的action，选择的过程我们称为**决策(Policy)**，这个决策方案多种多样，可以是基于规则的，深度学习的，强化学习等...，这是由开发者自己敲定的。（比如：Action1：请告诉我消毒地点。Action2：请告诉我消毒模式。Action3：请告诉我消毒时长。Action4：好的。Action5：调用机器人去消毒的接口。所以Action其实不止可以是回复语句，也可以是一个接口。）
>**生成式回复**：并未事先编写好回复语句，回复的内容由模型决定，较不可控。
>
>

分析上面的几个例子，
Bot想要弄清楚自己怎么回复，就得先弄清楚User想表达的意思，这个过程叫**自然语言理解（nlu）：通常包括意图识别和实体识别两个部分。**
意图识别显然就是要弄明白User说出这句话是想做什么，实体识别是要识别出这句话里的关键词。那么什么是关键词呢？通常在任务型对话里面，机器人需要获取特定的关键信息才能完成一项任务。比如在上面的消毒任务里，机器人需要获取消毒地点、消毒模式、消毒时长，才能进行消毒。所以我们可以先设置好一些**槽位**（例子里是：地点、模式、时间），从User说的话中进行实体识别，将提取到的实体（也就是上面说的关键词）放入相应的槽位中（比如：手术室放入地点槽，15分钟放入时间槽），然后依次对空缺的槽位进行询问（比如：如果地点槽、时间槽都有值了，就对模式进行询问，其实也就是从一堆actions中选择了“询问模式”这个Action2），直到没有空槽，这个过程叫做**槽填**，**也就是我们设计了一个规则，通过这个规则可以针对User的话选择一个最合适的action，这个基于规则的决策我们给它取名叫槽填**。

总结一下，任务型对话主要包含三部分：

**意图识别：**常用方法是分类模型（切词 -> 向量化 -> 神经网络 -> 获取意图类别）
**实体识别：**常用方法包括查找、正则、crf、神经网络+crf
**槽填(Policy)**：有限槽位，依次对槽位进行询问，直到所有槽位均有值

>针对上面的例子进行设计如下：
>分类类别：【hello，request_disinfection，comfirm】
>实体：【手术室等地点词汇，双氧水等模式词汇，关于时间的词汇】
>槽位：【消毒地点，消毒模式，消毒时间】
>actions：【utter_hello，**disinfection_form**，ask_location，ask_schema，ask_time，sent】

![任务型对话执行过程解析](https://upload-images.jianshu.io/upload_images/23954681-aa514fd9774d9a07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接下来我们考虑这样一个情况：



![在任务对话中产生意图漂移](https://upload-images.jianshu.io/upload_images/23954681-94e44e644faf9a68.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



>针对上面的例子进行设计如下：
>分类类别：【hello，request_disinfection，FAQ，comfirm】
>实体：【手术室等地点词汇，双氧水等模式词汇，关于时间的词汇】
>槽位：【消毒地点，消毒模式，消毒时间】
>actions：【utter_hello，**disinfection_form**，ask_location，utter_faq，ask_schema，ask_time，sent】

在上面例子中，User并不按照机器人的提问进行回复，在Bot问User消毒地点的时候，User说了一句与消毒任务无关的话，我们依旧对User的话进行nlu（意图识别、实体识别）处理，对“糖尿病患者有什么忌口？”这句话进行意图识别后得到患者的意图是FAQ，实体识别后的结果是无实体。
即：**User答非所问，产生了意图漂移，在原本执行消毒任务的过程中User突然想去进行FAQ询问。**
解决：**针对上面情况，我们设计如下决策：如果检测到FAQ意图就去执行FAQ的action，当执行完utter_faq这个action后，需要再回到消毒任务中，并再次对空槽进行询问，也就是继续执行原本的填槽策略。**所以在回答完糖尿病患者不宜吃的东西后，Bot又问了一遍User消毒地点。



我们再考虑这样一个情况：



![多任务嵌套](https://upload-images.jianshu.io/upload_images/23954681-bf8a735e8b5eaea5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



>针对上面的例子进行设计如下：
>分类类别【hello，request_disinfection，FAQ，comfirm，request_nuclear】
>实体：【手术室等地点词汇，双氧水等模式词汇，关于时间的词汇， 关于测量模式的词汇，关于床号的词汇】
>槽位：【消毒地点，消毒模式，消毒时间】【  核医学测量模式，核医学测量床号】
>actions：【utter_hello，**disinfection_form**，ask_location，utter_faq，ask_disinfect_schema，ask_time，disinfection_sent，**nuclear_form**，ask_nuclear_schema，ask_bed_number，nuclear_sent】

在上面例子中，User在做消毒任务的过程中突然想去做核医学任务，我们首先依旧是对”手术室。omg！我突然想起来漏了个体温任务！ “这句话进行nlu处理，得到意图为核医学，实体为体温。
即：**在做任务的时候User开启了另一个任务**
解决：**针对上面的情况，我们设计如下策略：如果检测到要求开启核医学任务的意图就进入核医学任务中执行槽填，直到槽填满后，需要再回到消毒任务中。**



我们再考虑这样一个情况：



![对话状态跟踪 DST](https://upload-images.jianshu.io/upload_images/23954681-6a2faa674d89d810.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



>针对上面的例子进行设计如下：
>分类类别：【hello，request_disinfection，comfirm，explain】
>实体：【手术室等地点词汇，双氧水等模式词汇，关于时间的词汇】
>槽位：【消毒地点，消毒模式，消毒时间】
>actions：
>方案一【utter_hello，**disinfection_form**，ask_location，ask_disinfect_schema，ask_time，utter_explain， disinfection_sent】
>方案二【utter_hello，**disinfection_form**，ask_location，ask_disinfect_schema，ask_time，explain_location，explain_schema，utter_explain， disinfection_sent】

看上面的例子，我们刚刚说过，首先对User的话进行nlu处理，红色框框处的User说”有什么“，意图识别为寻求解释，实体为无实体。这也算是一种意图漂移, 但bot怎么知道什么时候要去解释地点, 什么时候要去解释模式呢? 这时候就要利用到对话任务中除了之前说过的nlu和Policy外的另一种方法:DST对话状态跟踪。

**DST对话状态跟踪指的是bot在进行回复决策的时候， 不仅要考虑到当前轮User的话， 还要考虑到User之前说的话, 也就是DST需要追踪到的包括: 当前轮User的回复，意图，实体，以及前几轮User的回复，意图，实体以及前几轮bot的回复。**这样一来, 针对"有什么?"这一问题进行action选择时， 还会融入上下文信息。

方案一  ：你依旧可以在决策中添加一个规则，让explain这个意图的action为utter_explain，然后在utter_explain这个action中设计一个依据上下文选择不同类型回复的功能。

方案二  ：我们可以设计一个决策 ：**在消毒任务中采用槽填进行action的选择，只要进行了意图漂移，我们就采用规则+神经网络的置信度进行决策，如果我们为某个意图指定了action，其决策置信度就为1， 同时我们会编写很多对话让神经网络学习我们的对话，网络的输入为DST，输出为每个action的置信度，我们只需要选择置信度最高的action作为当前bot需要执行的action就可以了。**比如我们在规则里写了hello意图应该去执行utter_hello这个action，那当User说了个hello意图后，我们根据所有action的得分会发现utter_hello这个action的得分是1为最高，所以hello意图就执行utter_hello这个得分最高的action; 由于我们没有给explain这个意图指定action，那当User说了个explain意图后，我们根据由神经网络得到的所有action的得分去执行得分最高的action。


---------------------------------------------------------------------------------------------------------------

根据上面的例子，我们总结一下对话系统的处理方式:

![智能对话](https://upload-images.jianshu.io/upload_images/23954681-eb2d00c7f93d511c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>上面是从网上copy的图，图片整理自阿里达摩院分享的内容：https://developer.aliyun.com/article/742085?spm=a2c6h.12873581.0.0.7be4187aIl8KW6&from=singlemessage&isappinstalled=0
>**对话系统的搭建一般有两种方式：一种是pipeline，另一种是端到端。端到端的方式尚不成熟，在业界应用有限。pipeline的组件包括：NLU （自然语言理解），DST（对话状态跟踪）， Policy（对话决策）， NLG（自然语言生成）。其中DST和Policy统称为对话管理。**NLU一般包含意图识别和实体识别两个部分；DST则是用于记录对话上下文信息的，记录方式由开发者决定，可以仅记录当前轮的信息，也可以记录最近n轮的信息，可以记录text+intent+slot+value，也可以只记录slot-value，甚至可以把信息编码成向量，无论采用何种记录方式，DST都会把整理好的信息传递给Policy进行决策。Policy通过DST传来的信息，通过由槽填、或者是编写的一些规则、或深度学习或强化学习构建好的决策过程，决策出系统该采取怎样的响应。NLU则依据Policy给出的方案，生成相应的回复语句给用户。



# 二、Rasa是什么

Rasa是一套开源机器学习框架，用于构建基于上下文的AI小助手和聊天机器人。Rasa有两个主要模块：Rasa NLU 用于对用户消息内容的语义理解；Rasa Core 用于对话管理（Dialogue management）。Rasa官方还提供了一套交互工具 RasaX 帮助用户提升和部署由Rasa框架构建的AI小助手和聊天机器人。



>**Rasa官方文档**： [Build contextual chatbots and AI assistants with Rasa](https://links.jianshu.com/go?to=https%3A%2F%2Frasa.com%2Fdocs%2Frasa%2F)
>**github地址**：[RasaHQ/rasa](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FRasaHQ%2Frasa)

![rasa消息处理过程](https://upload-images.jianshu.io/upload_images/23954681-6a7d0effa187a472.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



上图展示了rasa框架中消息处理的过程，首先rasa对message进行interpreter即nlu处理，获取意图intent与实体value，然后rasa会维护一个tracker，tracker会记录下message以及intent和slot-value，将tracker记录下的信息传递给policy，通过policy选择置信度最高的action，选择的action也将被记录在tracker里面，action将获取的回答回复给用户。rasa将pipeline衔接部分都写好了，允许用户自定义意图识别方法、实体识别方法、决策方法、action等。



# 二、Rasa怎么用

![rasa github](https://upload-images.jianshu.io/upload_images/23954681-0d7e10681c8160e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



首先我们需要安装rasa，安装包直接在命令行输入pip install rasa 就可以了。
现在我们有了rasa以及需要安装的依赖环境，这时候我们就可以开始学习github里的examples代码，把example代码下载到本地用ide打开，example里写了一些使用rasa做聊天机器人的例子。

![rasa examples](https://upload-images.jianshu.io/upload_images/23954681-abc011d57ec78353.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在例子中我们可以看到，rasa可以用来做任务型槽填（form）机器人，也可以用来实现闲聊机器人，也可以用来做一个基于知识图谱的问答机器人，我们以任务型机器人即formbot为例，对rasa的用法做一个大致介绍。

![formbot](https://upload-images.jianshu.io/upload_images/23954681-390d9ee8e2624c6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



我们可以看到目录下文件不多，这些文件除了tests（test可以忽略，是我们通过交互生成的一些故事）都是必须的。
actions文件夹下的actions.py允许用户自定义一个FormAction
data文件夹下的nlu.yml是放置意图识别和实体识别的训练数据的
rules.yml允许用户编写基于规则的Policy
stories.yml允许用户编写基于深度学习的Policy的训练语料
config.yml允许用户选择nlu和core的组件
domain.yml中允许用户定义模型需要的意图种类、实体种类、槽位、动作、form任务名等。
endpoints.yml 包含自定义操作的webhook配置，无需修改。

具体来说：

### config文件

![config](https://upload-images.jianshu.io/upload_images/23954681-3070a6056feb7b86.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

language：语言设置，你的语料是中文就写zh
pipeline：nlu的组件设置，包括jieba切词、正则、向量化、预训练模型、分类模型、实体提取模型等。每个组件的用法、选择条件可以看看官网文档：

![rasa nlu](https://upload-images.jianshu.io/upload_images/23954681-42fe9d95ad6502ce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

policies：policy的组件设置，常用的有深度学习TEDPolicy、规则RulePolicy、历史记忆MemoizationPolicy、槽填Form Policy 、匹配Mapping Policy、默认回复Fallback Policy。每个组件的用法、选择条件可以看看官网文档：

![rasa policy](https://upload-images.jianshu.io/upload_images/23954681-321915c10ece3ea8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

补充：在旧版本中，可以给每个组件指定优先级别- priority，比如我们设置MemoizationPolicy的优先级高于TEDPolicy，那么如果在stories里出现过的语料在选择actions的时候，就不会根据神经网络去选择，优先级顺序是有默认的，一般不轻易改变。

### domain文件

![domain](https://upload-images.jianshu.io/upload_images/23954681-dd8386d3964e5f45.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

intents：意图识别的种类名， use_entities: [] 代表该类型意图不需要进行实体提取。
entities：实体识别的种类名。
slots：槽位名，type：如果您只想存储一些数据，但又不想影响对话的流程（也就是不会用来预测机器人的下一个动作），使用unfeaturized插槽。除此之外还有text、bool、list、categorical等。auto_fill：如果NLU的的实体识别的名称与槽位名称相同，则该插槽将自动设置，如果希望取消这个功能则用False。

![domain](https://upload-images.jianshu.io/upload_images/23954681-066fd976012d8016.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

responses：里面记录了一些actions，这些actions内容是回复模板句。

![domain](https://upload-images.jianshu.io/upload_images/23954681-7a74cbd2534cee9f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



forms：槽填任务名称。可以有多个form，cuisine、num_people为槽位名，-type说明了填槽的槽值从哪里来，槽值可以是从实体识别中获取，也可以是从意图获取，比如识别到某个意图，就设该槽值为True。intent和not_intent约束了槽值来自的意图类型，有一些意图类型就算提取出和槽名相同的实体也不可以放入在槽位里。value为槽值，我们可以通过value设置某意图的槽值，比如你表达了想靠窗的意图，我就把靠窗的槽值设置为True。

### data文件夹



![data nlu](https://upload-images.jianshu.io/upload_images/23954681-d8c0c4d4f9ca2175.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

data下的nlu文件其实就是设置了意图识别和实体识别的语料。实体用[]括起来，后面跟着实体名称用（）。

![data rules](https://upload-images.jianshu.io/upload_images/23954681-c0edf337e2e89e8c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

rules允许用户编写一些Policy的规则，只要出现某个意图就做某个动作。其中activate restaurant form为激活表单进入到餐厅的槽填任务中，直到任务完成才跳出，所以加上active_loop。
补充：在旧版本中没有rules？

![data stories](https://upload-images.jianshu.io/upload_images/23954681-7932b38ad8d4367a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

stories里写了一些数据可供Policy进行深度学习，rasa会把你在stories写的意图和槽-槽值，以及上文的意图和槽-槽值，都存在tracker里面，然后tracker把数据给policy，policy利用这些数据作为训练集进行深度网络的训练，把训练好后的模型保存起来，供之后预测使用。
stories可以通过rasa interactive在线交互得出。

### actions文件夹
actions.py可以自定义一些actions，因为之前说过action不一定是回复语句，可以是接口，可以是进入槽填任务。
```

from typing import Dict, Text, Any, List, Union

from rasa_sdk import Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormAction


class RestaurantForm(FormAction):
    """Example of a custom form action."""

    def name(self) -> Text:
        """Unique identifier of the form."""

        return "restaurant_form"
```
formbot的action——**class RestaurantForm(FormAction):上面定义了它的名字叫 restaurant_form本质上也是一个action，只是这个action是槽填action，一旦我们进入了restaurant_form这个action，我们就必须一直填槽直到槽填满为止**。还记得之前定义过下面的东西，如果识别到用户的意图是要进行餐厅询问了，那么就进入了restaurant_form这个action，一旦进入我们就会激活这个槽填功能，约束机器人一直对空槽进行询问，所以会有个active_loop：
![form action](https://upload-images.jianshu.io/upload_images/23954681-3851f78dfd49a250.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
    @staticmethod
    def required_slots(tracker: Tracker) -> List[Text]:
        """A list of required slots that the form has to fill."""

        return ["cuisine", "num_people", "outdoor_seating", "preferences", "feedback"]
```
required_slots定义了这个formbot需要的槽位。

```
    def slot_mappings(self) -> Dict[Text, Union[Dict, List[Dict]]]:
        """A dictionary to map required slots to
            - an extracted entity
            - intent: value pairs
            - a whole message
        or a list of them, where a first match will be picked."""

        return {
            "cuisine": self.from_entity(entity="cuisine", not_intent="chitchat"),
            "num_people": [
                self.from_entity(
                    entity="number", intent=["inform", "request_restaurant"]
                ),
            ],
            "outdoor_seating": [
                self.from_entity(entity="seating"),
                self.from_intent(intent="affirm", value=True),
                self.from_intent(intent="deny", value=False),
            ],
            "preferences": [
                self.from_intent(intent="deny", value="no additional preferences"),
                self.from_text(not_intent="affirm"),
            ],
            "feedback": [self.from_entity(entity="feedback"), self.from_text()],
        }
```
slot_mapping定义了什么样的意图和实体可以作为槽位的槽值，其实也就是之前说过的domain里的内容。

```
@staticmethod
    def cuisine_db() -> List[Text]:
        """Database of supported cuisines."""

        return [
            "caribbean",
            "chinese",
            "french",
            "greek",
            "indian",
            "italian",
            "mexican",
        ]

    @staticmethod
    def is_int(string: Text) -> bool:
        """Check if a string is an integer."""

        try:
            int(string)
            return True
        except ValueError:
            return False

    def validate_cuisine(
        self,
        value: Text,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> Dict[Text, Any]:
        """Validate cuisine value."""

        if value.lower() in self.cuisine_db():
            # validation succeeded, set the value of the "cuisine" slot to value
            return {"cuisine": value}
        else:
            dispatcher.utter_message(template="utter_wrong_cuisine")
            # validation failed, set this slot to None, meaning the
            # user will be asked for the slot again
            return {"cuisine": None}

    def validate_num_people(
        self,
        value: Text,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> Dict[Text, Any]:
        """Validate num_people value."""

        if self.is_int(value) and int(value) > 0:
            return {"num_people": value}
        else:
            dispatcher.utter_message(template="utter_wrong_num_people")
            # validation failed, set slot to None
            return {"num_people": None}

    def validate_outdoor_seating(
        self,
        value: Text,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> Dict[Text, Any]:
        """Validate outdoor_seating value."""

        if isinstance(value, str):
            if "out" in value:
                # convert "out..." to True
                return {"outdoor_seating": True}
            elif "in" in value:
                # convert "in..." to False
                return {"outdoor_seating": False}
            else:
                dispatcher.utter_message(template="utter_wrong_outdoor_seating")
                # validation failed, set slot to None
                return {"outdoor_seating": None}

        else:
            # affirm/deny was picked up as True/False by the from_intent mapping
            return {"outdoor_seating": value}
```
上面那串代码中的validate_xxxx,允许我们去**修正槽值**，比如当我们从实体识别中获取到了时间的实体，但是人们对于时间的表述总是多样的，比如三小时、3小时、三个小时其实都代表同一个意思，为了方便后续使用，我们往往会把它的格式统一化比如3h。再比如上面有个槽位叫outdoor_seating，你提取到的实体可能是out或者in，但是你想规范成True或者False，当不满足out或in的时候，比如用户说了个both ok，你就像告诉用户他们说错了以便用户修正，所以利用utter_message还有**传递消息**的功能。

```
    def submit(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:
        """Define what the form has to do after all required slots are filled."""

        dispatcher.utter_message(template="utter_submit")
        return []
```
submit在所有槽位填满以后执行。

-----------------------------------------------------------------------------------------------------------------------------------------------
写好上面的文件，我们就可以启用rasa了，在命令行里输入：rasa train，可以把你写好的nlu数据和stories数据喂到神经网络去训练，训练好后会在model文件夹下得到模型，然后启用在命令行输入：rasa run actions ，然后开启另一个命令行窗口输入：rasa shell ,就可以进行交互了。

### 补充：

rasa还提供了rasax，可以方便我们部署和回收用户数据，但rasax在机器性能不好时卡顿较严重。
rasa给我们提供了很多组件，如果组件不够用我们还可以自定义组件。
rasa的DST通过tracker维护，不允许用户修改，若修改底层代码较为复杂，有些组件的功能官方文档上并没有说详细，如果用户想弄明白一些组件的功能，需要从源码入手，也较为麻烦。
rasa的功能远比文档上说的要丰富，如果拓展功能需要对rasa很熟悉，尤其时form功能。