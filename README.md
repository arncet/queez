#Queez

A simple Javascript library to create quizz.

##Navigation :

* [How to use](#how-to-use-)
* [Documentation](#documentation-)
* [Examples](#examples-)
* [License](#license-)
* [Development](#development-)

##How to use :

Install `queez` via npm :

```
npm install --save queez
```

Use it :

```javascript
import Queez from 'queez'

const quizz = new Queez(config)
```

`config` is an object containing all your quizz configuration

An example of the `congif` content :

```javascript
const config = {
	questions: [...],
	categories: [...],
	results: [...],
	callbacks: {...}
}
```

All informations relating to `config` content are available in the section below.


##Documentation :

###Queez :

<u>Properties :</u>

The `config` object has `questions`, `categories`, `resultats` and `callbacks` properties.
Other properties may be added, they will automatically injected within the `custom` property of `queez` instance. <br/>
There is an example for a custom property named `titre`:


```javascript
const config = {
	title: 'An awesome quizz',
	...
}

const quizz = new Queez(config)
//quizz.title => undefined
//quizz.custom.title => 'An awesome quizz'
```

* `question` : Represents quizz's questions (see doc [here](#question-)).
* `categories` : Represents results's categories of the quizz (voir la doc [here](#category-)).
* `results` : Represents possibles quizz's results (voir la doc [here](#result-)).
* `callbacks` : Represents available quizz's callbacks (voir la doc [here](#callbacks-)).


You will find below the details of the main property `config` :


| Name          | Type            | Required      | Default value |
|:------------- |:----------------| :-------------| :-------------|
| questions     | Array           | false         | [ ]           |
| categories    | Array           | false         | [ ]           |
| results       | Array           | false         | [ ]           |
| callbacks     | Object          | false         | { }           |

If a property has a wrong type, the default value will be assigned.

<u>Methods :</u>

####`getQuestion(questionId)` => [Question](#question-) :
Retrieve a question from its id. <br/>

* `questionId` (Integer | String) : Question id.

---------------------------------------

####`getQuestionsBy(attribut, value)` => Array of [Question](#question-) :
Retrieve an array of questions from the value of a given attribute

* `attribute` (String | Array)  : Attribute (ot attribute's path, e.g `['custom', 'title']` for `title` attribute of `custom`)<br/>
* `value` : Attribute's value.

---------------------------------------

####`getQuestionByAnswer` => [Question](#question-) :
Retrieve a question from an answer id.

* `answerId` (Integer \| String) : Answer's id.

---------------------------------------

####`getResult` => [Result](#result-) :
Retrieve a result from its id.

* `resultId` (Integer \| String) : Result's id.

---------------------------------------

####`getResultsBy` => Array of [Result](#result-) :
Retrieve an array of result from the value of a given attribute.

* `attribute` (String | Array)  : Attribute (ot attribute's path, e.g `['custom', 'title']` for `title` attribute of `custom`)<br/>
* `value` : Attribute's value.

---------------------------------------

####`getCategory` => [Category](#category-) :
Retrieve a category from its id.

* `categoryId` : L'id de la categorie.

---------------------------------------

####`getCategoriesBy` => Array of [Category](#category-) :
Retrieve an array of category from the value of a given attribute.

* `attribute` (String | Array)  : Attribute (ot attribute's path, e.g `['custom', 'title']` for `title` attribute of `custom`)<br/>
* `value` : Attribute's value.

---------------------------------------

####`isComplete` => Boolean :
Check if all questions has been answered.

---------------------------------------

####`getResponse` => Array of [Result](#result-) | Array of [Question](#question-) (props less):
Get finals quizz's results. <br/>
If there is elements in `config.results`, `getResponse` return an `result` array, else return quizz's `question` as 'props less' (just contain properties : `id`, `content`, `custom` and `answer` (props less)).

---------------------------------------

###Question :

Questions are the main quizz element.<br/>
There is a example of question :

```javascript
{
  "id": "question-1",
  "content": "What is yout favorite color ?",
  "categoryId": "favorite-color",
  "answers": [...],
  "multiple": false
}
```
<u>Properties :</u>

* `id` : Represents the question identifier (unique).
* `content` : Represents the content of the question
* `categoryId` : Represent the id of the category to which belongs the question.
* `answers ` : Represnete the proposed answers to the question (see doc [here](#answer-)).
* `multiple`: Define if a question can be answered several times, with different answers.

Other properties may be added, they will automatically injected within the question `custom` property. <br/>


| Name          | Type               | Required      | Default value          |
|:------------- |:-------------------| :-------------| :----------------------|
| id            | Integer \| String  | false         | Random string (9 char.)|
| content       | Integer \| String  | false         | /                      |
| categoryId    | Integer \| String  | false         | Empty string           |
| answers       | Array              | false         | [ ]                    |
| multiple      | Boolean            | false         | false                  |

<u>Methods :</u>

#####`getAnswer(answerId)` => [Answer](#answer-) :
Retrieve a answer from its id.

* `answerId ` (Integer | String) : L'id de la reponse.

---------------------------------------

####`getAnswersBy(attribut, value)` => Array :
Retrieve an array of answer from the value of a given attribute.

* `attribute` (String | Array)  : Attribute (ot attribute's path, e.g `['custom', 'title']` for `title` attribute of `custom`)<br/>
* `value` : Attribute's value.

---------------------------------------

####`isAnswered` => Boolean :
Return `true` if the question is answered.

---------------------------------------

####`respond` :
Respond to the question.

* `answerId` : Answer's id.

---------------------------------------

####`unRespond` :
Un-resopnd to the question

* `answerId` : Answer's id.

---------------------------------------

####`toPropsLess` :
Return the `question` with just `id`, `content`, `custom` and `answers` properties (props less).


###Answer :

`Answer` are several proposals for a question. <br/>
Here is an example of a response :

```javascript
{ "id": "answer-1", "content": "Yellow", "value": "yellow", coefficient: 1 }
```
<u>Properties :</u>

* `id` : Represents the answer identifier (unique).
* `content` : Represents the answer content.
* `value` : Represents the answer value.
* `coefficient ` : Represents the answer coefficient.

Other properties may be added, they will automatically injected within the answer `custom` property. <br/>


| Name          | Type               | Required      | Default value           |
|:------------- |:-------------------| :-------------| :-----------------------|
| id            | Integer \| String  | false         | Random string (9 char.) |
| content       | Integer \| String  | false         | Empty string            |
| value         | Integer \| String  | false         | Empty string            |
| coefficient   | Integer            | false         | 1                       |

<u>Methods :</u>

####`toPropsLess` :
Return `answer` with `id`, `content` and `custom` properties.

###Category :

`category` objects are the elements that make the connection between the questions and possible quiz's result. These may be characterized as the type of question. <br/>
Here is an example of category :

```javascript
{ "id": "favorite-color" }
```
<u>Properties :</u>

* `id` : Represents the category identifier (unique).

Other properties may be added, they will automatically injected within the category `custom` property. <br/>


| Name          | Type               | Required      | Default value           |
|:------------- |:-------------------| :-------------| :-----------------------|
| id            | Integer \| String  | true          | Random string (9 char.) |

###Result :

`result` objects are the different results possible for the quiz.<br/>
Here is an example of results :

```javascript
{
	"id": "result-1",
	"filter": { "favorite-color": "yellow", "favorite-food": "burger" }
}
```
<u>Properties :</u>

* `id` : Represents the result identifier (unique).
* `filter` : Represents the conditions to obtain this result. A `result` without filter will always be returned in the final results of the quiz (via the method [getResponse](#getResponse-)). <br/> Each `filter` object is a condition, the key represents the `category`'s id and value define its value (the value of `answer.value`)

	```javascript
	{
		{ "favorite-color": "yellow" }
	}
	```
	In this case, to obtain this result, it is necessary that the question (or 	most questions) has `favorite-color` as categoryId have one (or most) response 	with `yellow` value.

	Conditions can be combined to build most impressive or strict conditions.

	An `object` represents an `ET` and an `array` represents an `OU`:

	To define a result with the following condition : "favorite color" is 	"yellow" `AND` "favorite food" is "burger", must be :

	```javascript
	{ "filter": { "favorite-color": "yellow", "favorite-food": "burger" } }
	```

	To define a result with the following condition : "favorite colors" are 	"green" `AND` "pink", must be :

	```javascript
	{
		"filter": {
			"favrite-colors": {"green": true, "pink": true}
		}
	}
	```

	**Note: In case a category is defined by an "AND" key values ​​can take any 	value type. Filter just need to be defines as an object.**

	Other exemples :

	```javascript
	{ "filter": { "favorite-color": ["blue", "red"] } }
	//favorite color is blue OR red

	{ "filter": [ "favorite-color": "yellow", "favorite-food": "burger" ] }
	//favorite color est yellow OR favorite food is burger

	{ "filter": { "favorite-color": ["blue", "red"], "favorite-food": "rice" } }
	//favorite color is blue OU red, AND favorite food is rice

	{
		"filter": [
			{"favorite-color": "green", "favorite-food": "rice"},
			{"favorite-color": ["blue", "red"], "favorite-food": "burger"}
		]
	}
	//favorite color is green AND favorite food is rice,
	//OR favorite color is blue OR red AND favorite food is burger
	```
* `content` : Represents the result content.

Other properties may be added, they will automatically injected within the result `custom` property. <br/>


| Name          | Type               | Required      | Default value           |
|:------------- |:-------------------| :-------------| :-----------------------|
| id            | Integer \| String  | false         | Random string (9 char.) |
| filter        | Object \| Array    | false         | { }                     |
| content       | Integer \| String  | false         | Empty string            |

###Callbacks :

`callback` are functions that are called at the end of a specific action. <br/>
Here is an example of callback:

```javascript
{
  	onQuestionRespond: [
  		function(question, answer, error) {
	  		console.log('onQuestionRespond', question, answer, error)
		}
	],
}
```

Each `callback` is an `array` of function`, each function will be called once the specific action performed in the order in which they defined summers.

<u>Avaliable callbacks list :</u>

* `onQuestionRespond` :  Execute all associated functions when a question is answered. Callbacks will have the following properties :
	* `question` [Question](#question-): The answered question.
	* `answer` [Answer](#answer-): The question's answer.
	* `error` null | string : Error, `null` If there is no error.

* `onQuestionUnRespond` : Execute all associated functions when a question is un-answered. Callbacks will have the following properties :	* `question` [Question](#question-): The answered question.
	* `answer` [Answer](#answer-): The question's answer.
	* `error` null | string : Error, `null` If there is no error.

* `onQuizzComplete` : Execute all associated functions when the quiz ends (when all the questions have summers reponsues). Callbacks will have the following properties :
	* `quizz` [Queez](#queez-): L'instance du quizz.

##Examples :

###Example 1 : Preferences survey :

[Sources here](https://github.com/arncet/queez/blob/master/example/quizz-config-survey.js)

Here the quizz's questions as text :

```
1 - Among the following colors, which do you prefer ?
	Green, Yellow, Red ou Blue.

2 - Among the following foods, which do you prefer ?
	Burger, Salad, Pizza ou Rice.

3 - Among the following car brand, which do you prefer?
	Audi, BMW, Aston Martin ou Chevrolet.

4 - Among the following OS, which do you prefer ?
	Mac OS, Windows, Linux.
```

The `questions` property of the object `config` will be:

```javascript
[
	{
	  "id": "favorite-color",
	  "content": "Among the following colors, which do you prefer ?",
	  "answers": [
	  	{ "id": "c-answer-1", "content": "Green", "value": "green" },
		{ "id": "c-answer-2", "content": "Yellow", "value": "yellow" },
		{ "id": "c-answer-3", "content": "Red", "value": "red" },
		{ "id": "c-answer-4", "content": "Blue", "value": "blue" }
	  ]
	},
	{
	  "id": "favorite-food",
	  "content": "Among the following foods, which do you prefer ?",
	  "answers": [
	  	{ "id": "f-answer-1", "content": "Burger", "value": "burger" },
		{ "id": "f-answer-2", "content": "Salad", "value": "salad" },
		{ "id": "f-answer-3", "content": "Pizza", "value": "pizza" },
		{ "id": "f-answer-4", "content": "Rice", "value": "rice" }
	  ]
	},
	{
	  "id": "favorite-car-brand",
	  "content": "Among the following car brand, which do you prefer ?",
	  "answers": [
	  	{ "id": "c-b-answer-1", "content": "Audi", "value": "audi" },
		{ "id": "c-b-answer-2", "content": "BMW", "value": "bmw" },
		{ "id": "c-b-answer-3", "content": "Aston Martin", "value": "aston-martin" },
		{ "id": "c-b-answer-4", "content": "Chevrolet", "value": "chevrolet" }
	  ]
	},
		{
	  "id": "favorite-os",
	  "content": "Among the following OS, which do you prefer?",
	  "answers": [
	  	{ "id": "os-answer-1", "content": "Mac OS", "value": "mac-os" },
		{ "id": "os-answer-2", "content": "Windows", "value": "windows" },
		{ "id": "os-answer-3", "content": "Linux", "value": "linux" }
	  ]
	}
]
```

###Example 2 : Quizz Super-héros :

[Sources here](https://github.com/arncet/queez/blob/master/example/quizz-config-super-hero.js)

Here the quizz's questions as text :

```
1 - You are a man or a woman ?
	Man, Woman.

2 - What is your favorite color ?
	Red, Blue, Noir, Green.

3 - What attribute you would like to have ?
	Strength, Speed, Agility.
```

Here the possibles results :

| Nom           | Sexe  | Couleur         |  Attribut             |
|:--------------|:------|:----------------|:----------------------|
| Superman      | Man   | Red && Blue     | Strength              |
| Batman        | Man   | Noir            | Agility               |
| Batman        | Man   | Noir            | Strength              |
| Hulk          | Man   | Green           | Strength              |
| Flash         | Man   | Red             | Agility & Speed       |
| Wonder Woman  | Woman | Red \|\| Blue   | Strength              |
| Spider-man    | Man   | Red && Blue     | Agility               |
| Thor          | Man   | Red \|\| Black  | Agility & Elementaire |
| Tornade       | Woman | Noir            | Elementaire           |
| Iron-man      | Man   | Red             | Strength              |
| Green Lantern | Man   | Green           | Agility & Elementaire |

The `categories` property of the object `config` will be:

```javascript
[
	{ "id": "sexe" },
	{ "id": "color" },
	{ "id": "attribute" }
]
```

The `questions` property of the object `config` will be:

**Note : Do not forget the `multiple` property to the question `question-color` and question `question-attribute` To select multiple colors and / or attributes**

```javascript
[
	{
	  "id": "question-sexe",
	  "content": "You are a man or a woman ?",
	  "categoryId": "sexe",
	  "answers": [
	  	{ "id": "answer-sexe-1", "content": "Man", "value": "man" },
		{ "id": "answer-sexe-2", "content": "Woman", "value": "women" }
	  ]
	},
	{
	  "id": "question-color",
	  "content": "What is your favorite color ?",
	  "categoryId": "color",
	  "multiple": true,
	  "answers": [
	  	{ "id": "answer-color-1", "content": "Red", "value": "red" },
		{ "id": "answer-color-2", "content": "Blue", "value": "blue" },
		{ "id": "answer-color-3", "content": "Black", "value": "black" },
		{ "id": "answer-color-4", "content": "Green", "value": "green" }
	  ]
	},
	{
	  "id": "question-attribut",
	  "content": "What attribute you would like to have ?",
	  "categoryId": "attribute",
	  "multiple": true,
	  "answers": [
	  	{ "id": "answer-attribute-1", "content": "Strength", "value": "strength" },
		{ "id": "answer-attribute-2", "content": "Speed", "value": "speed" },
		{ "id": "answer-attribute-3", "content": "agility", "value": "agility" },
		{ "id": "answer-attribute-4", "content": "Elementary", "value": 		  "elementary" }
	  ]
	}
]
```

The `results` property of the object `config` will be:

```javascript
[
	{
      "id": "result-1",
      "content": "Superman",
      "filter": {
      		"sexe": "man",
      		"color": {"red": true, "blue": true},
      		"attribute": "strength"
      }
    },
    {
      "id": "result-2",
      "content": "Batman",
      "filter": [
        {
          "sexe": "man",
          "color": "black",
          "attribute": "agility"
        },
        {
          "sexe": "man",
          "color": "black",
          "attribute": "strength"
        }
      ]
    },
    {
      "id": "result-3",
      "content": "Hulk",
      "filter": {
      		"sexe": "man",
      		"color": "green",
      		"attribute": "strength"
      }
    },
    {
      "id": "result-4",
      "content": "Flash",
      "filter": {
      		"sexe": "man",
      		"color": "red",
      		"attribute": {"agility": true, "speed": true}
      }
    },
    {
      "id": "result-5",
      "content": "Wonder Woman",
      "filter": {
      		"sexe": "woman",
      		"color": ["red", "blue"],
      		"attribute": "strength"
      }
    },
    {
      "id": "result-6",
      "content": "Spider-man",
      "filter": {
      		"sexe": "man",
      		"color": {"red": true, "blue": true},
      		"attribute": "agility"
      }
    },
    {
      "id": "result-7",
      "content": "Thor",
      "filter": {
      		"sexe": "man",
      		"color": ["red", "black"],
      		"attribute": {"strength": true, "elementary": true}
      }
    },
    {
      "id": "result-8",
      "content": "Tornade",
      "filter": {
      		"sexe": "woman",
      		"color": "black",
      		"attribute": "elementary"
      }
    },
    {
      "id": "result-9",
      "content": "Iron-man",
      "filter": {
      		"sexe": "man",
      		"color": "red",
      		"attribute": "strength"
      }
    },
    {
      "id": "result-10",
      "content": "Green Lantern",
      "filter": {
      		"sexe": "man",
      		"color": "green",
      		"attribute": {"strength": true, "elementary": true}
      }
    }
]
```

##Development:

```
npm install //Install node modules
gulp        //Start gulp watching and compile src
npm test    //Run tests
```

##License :

MIT







