        let words;
        let currentIndex = 0;
        let utterance;
        let isReading = false;

        let speech = new SpeechSynthesisUtterance();
        speech.lang = 'es-ES';

        function startSpeech() {
            if (!isReading) {
                isReading = true;
                const text = document.getElementById('textToRead').innerText;
                words = text.split(/\s+/);
                readWords();
            }
        }

        function readWords() {
            if (isReading && currentIndex < words.length) {
                highlightWord(words[currentIndex]);
                speakWord(words[currentIndex]);
                currentIndex++;
            } else {
                isReading = false; // Restablecer el estado de lectura
            }
        }

        function highlightWord(word) {
            const textElement = document.getElementById('textToRead');
            const regex = new RegExp(`\\b${word}\\b`);

            textElement.innerHTML = textElement.innerHTML.replace(regex, `<span class="highlight">${word}</span>`);
        }

        function speakWord(word) {
            utterance = new SpeechSynthesisUtterance(word);
            utterance.onend = function () {
                readWords(); // Continuar leyendo después de que la palabra se haya hablado
            };
            speechSynthesis.speak(utterance);
        }

        function stopSpeech() {
            isReading = false;
            speechSynthesis.cancel(); // Detener la síntesis de voz
            currentIndex--; // Retroceder una palabra para reanudar desde donde se detuvo
        }

        function removeHighlight() {
            const textElement = document.getElementById('textToRead');
            textElement.innerHTML = textElement.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
        }

        function resumeSpeech() {
            if (!isReading) {
                isReading = true;
                readWords(); // Reanudar la lectura desde donde se detuvo
            }
        }

        

        

