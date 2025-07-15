<!DOCTYPE html>
<html>
<head>
    <title>Abletools Translation</title>
</head>
<body>

    <!-- Example content to translate -->
    <p class="translatable">Welcome to Abletools!</p>
    <p class="translatable">We provide the best solutions for your business.</p>

    <!-- Translation Buttons -->
    <button onclick="translatePage('EL')">Greek</button>
    <button onclick="translatePage('EN')">English</button>

    <script>
        async function translatePage(lang) {
            // Get all elements that should be translated
            const elements = document.querySelectorAll('.translatable');
            
            for (let el of elements) {
                // Each element's text content is sent to the server
                let originalText = el.innerText;
                
                try {
                    let response = await fetch('/translate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': '{{ csrf_token() }}' // Important for Laravel
                        },
                        body: JSON.stringify({
                            text: originalText,
                            lang: lang
                        })
                    });
                    
                    let data = await response.json();
                    
                    if (data.translations && data.translations[0]) {
                        el.innerText = data.translations[0].text;
                    }
                } catch (error) {
                    console.error('Translation error:', error);
                }
            }
        }
    </script>
</body>
</html>
