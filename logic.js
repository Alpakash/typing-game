	const sentences = [
			"Do you like JavaScript as much as I do?",
			"Man I love being productive during the day."
		]

		const message = document.querySelector(".message");
		const playText = document.querySelector("textarea");
		const button = document.querySelector("button");
		const correctWords = document.querySelector(".correctWords");
		const typingSpeed = document.querySelector(".typingSpeed");
		let startTime, endTime, counter;		
		let start = "start";

		// Generate a random background color on page load 
		let colors = [
			"#e7b89e",
			"#8e89db",
			"#7aea79",
			"#66a994",
			"#3feeb9",
			"#0e9ef2",
			"#dd780d",
		];
		let randomColor = colors[Math.floor(Math.random()*7)];
		document.body.style.backgroundColor = randomColor;

		// Deactivate text selection
		if (typeof document.onselectstart!="undefined") {
			document.onselectstart = new Function("return false");
		} else {
			document.onmousedown = new Function("return false");
			document.onmouseup = new Function("return true")
		}

		document.addEventListener("keyup", function(e) {
			let buttonText = button.innerText.toLowerCase();
			
			if (e.keyCode == 83) {
				if (buttonText == start) {
					button.click();
				}
			}
		});

		playText.addEventListener("keydown", function(e) {
			let buttonText = button.innerText.toLowerCase();
			let string = playText.value;

			if (e.keyCode == 13) {
				if (buttonText == "done") {
					button.click();
				} 
			}
			
			makeWordBold(string, message.innerText);
		});

		button.addEventListener("click", function() {
			const buttonText = this.innerText.toLowerCase();
			if (buttonText == start) {
				playText.removeAttribute("disabled");
				correctWords.innerText = "";
				typingSpeed.innerText = "";

				playGame();
			} else if (buttonText == "done") {
				let string = playText.value;
				if (wordCounter(string) == wordCounter(message.innerText)) {
					endPlay();
				} else if (wordCounter(string) < wordCounter(message.innerText)) {
					correctWords.style.fontSize = "16px";
					correctWords.style.color = "red";
					correctWords.innerText =
					"Please write down all words before finishing.";
				} else if (wordCounter(string) > wordCounter(message.innerText)) {
					correctWords.style.fontSize = "16px";
					correctWords.style.color = "red";
					correctWords.innerText =
					"You've written to many words... remove some words to match the given sentence.";
				}
			}
		});

		function playGame() {
			const randomNumberLowerThen = (number) => {
				return Math.floor(Math.random() * number);
			}	

			let date = new Date();
			startTime = date.getTime();
			button.innerText = "Done";

			playText.value = "";
			playText.focus();

			message.innerHTML = sentences[randomNumberLowerThen(2)];
		}

		function endPlay() {
			let date = new Date();
			endTime = date.getTime();
			let totalTime = ((endTime - startTime) / 1000);
			
			let string = playText.value;
			let wordCount = wordCounter(string);
			let speed = Math.round((wordCount / totalTime) * 60);
			let correctWordsMessage;
			
			makeWordBold(string, message.innerText);
			playText.setAttribute("disabled", true);
			button.innerText = start.toUpperCase();

			correctWordsMessage = compareWords(string, message.innerText);
			typingSpeedMessage = `You typed ${speed} words per minute`;

			correctWords.innerHTML = correctWordsMessage;
			typingSpeed.innerHTML = typingSpeedMessage;
		}

		function wordCounter(wordsInString) {
			let response = wordsInString.split(" ").length;

			return response;
		}

		function compareWords(inputString, givenMessage) {
			let words1 = inputString.split(" ");
			let words2 = givenMessage.split(" ");
			let cnt = 0;
			
			words1.forEach(function(item, index) {
				if(item == words2[index]) {
					cnt++;
				}
			});
			
			let percentageCorrect = cnt / words2.length * 100;

			if (percentageCorrect > 50) {
				correctWords.style.color = "green";
				correctWords.style.fontSize = "40px";
			} else {
				correctWords.style.fontSize = "20px";
				correctWords.style.color = "red";
			}

			return `You got ${cnt} out of ${words2.length} words correct! That's ${Math.round(percentageCorrect)}%!`;
		}

		function makeWordBold(inputString, givenMessage) {
			let inputText = inputString.split(" ");
			let messsage = givenMessage.split(" ");
			
			console.log(inputText);
			console.log(messsage);

			if (inputText.length > messsage.length) {
				return message.innerHTML = givenMessage;
			}

			if (inputText.length <= messsage.length) {
				messsage[inputText.length-1] = messsage[inputText.length-1].bold();
				return message.innerHTML = messsage.join(" ");
			}
			
		}
		