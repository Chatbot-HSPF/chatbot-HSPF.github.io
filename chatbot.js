<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verfügbare Stimmen</title>
</head>
<body>
    <h1>Verfügbare Stimmen</h1>
    <p>Öffnen Sie die Konsole, um die Liste der verfügbaren Stimmen zu sehen.</p>

    <input type="text" id="user-input" placeholder="Geben Sie Ihre Nachricht ein">
    <button onclick="sendMessage()">Senden</button>
    <div id="messages"></div>
    <video id="avatar-video" class="hidden" controls>
        <source src="path_to_video.mp4" type="video/mp4">
        Ihr Browser unterstützt kein HTML5-Video.
    </video>

    <script>
        let voices = [];

        function populateVoiceList() {
            voices = speechSynthesis.getVoices();
            console.log('Available voices:', voices);
        }

        function speak(text) {
            const msg = new SpeechSynthesisUtterance(text);
            msg.lang = 'en-GB'; // Sprache auf UK Englisch setzen
            const selectedVoice = voices.find(voice => voice.name === 'Google UK English Male' && voice.lang === 'en-GB');

            if (selectedVoice) {
                msg.voice = selectedVoice;
            } else {
                console.log('Die Stimme "Google UK English Male" wurde nicht gefunden.');
            }

            msg.onstart = function(event) {
                playResponseVideo();
            };
            msg.onend = function(event) {
                stopResponseVideo();
                console.log('Finished in ' + event.elapsedTime + ' seconds.');
            };

            speechSynthesis.speak(msg);
        }

        function sendMessage() {
            const userInput = document.getElementById('user-input').value;
            if (userInput.trim() !== "") {
                displayMessage(userInput, 'user');
                const botMessage = "Hello, how can I assist you?"; // Beispieltext in Englisch
                setTimeout(() => {
                    displayMessage(botMessage, 'bot');
                    speak(botMessage);
                }, 500); // Verzögerung, um Bot-Antwort realistischer zu machen
            }
            document.getElementById('user-input').value = ''; // Eingabefeld leeren
        }

        function displayMessage(message, sender) {
            const messagesDiv = document.getElementById('messages');
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', sender);
            messageElement.innerText = message;
            messagesDiv.appendChild(messageElement);
            messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scrollen Sie nach unten, um die neue Nachricht anzuzeigen
        }

        // Funktion zum Abspielen des Videos nach der Bot-Antwort
        function playResponseVideo() {
            const responseVideo = document.getElementById('avatar-video');
            responseVideo.classList.remove('hidden');
            responseVideo.play();
        }

        // Funktion zum Anhalten des Videos nach der Bot-Antwort
        function stopResponseVideo() {
            const responseVideo = document.getElementById('avatar-video');
            responseVideo.pause();
            responseVideo.classList.add('hidden');
        }

        // Stimmen laden, um sicherzustellen, dass die gewünschte Stimme verfügbar ist
        window.speechSynthesis.onvoiceschanged = function() {
            populateVoiceList();
        };

        // Initialisieren Sie die Stimmliste
        populateVoiceList();
    </script>
</body>
</html>

