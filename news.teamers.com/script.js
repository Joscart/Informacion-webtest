document.addEventListener('DOMContentLoaded', function() {
    console.log('News page loaded');

    const newPostBtn = document.getElementById('new-post-btn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const newPostForm = document.getElementById('new-post-form');
    const newsContainer = document.getElementById('news-container');

    newPostBtn.addEventListener('click', function() {
        modal.classList.remove('hidden');
        modal.style.display = 'flex'; // Ensure the modal is displayed
    });

    closeModal.addEventListener('click', function() {
        modal.classList.add('hidden');
        modal.style.display = 'none'; // Ensure the modal is hidden
    });

    newPostForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const summary = document.getElementById('summary').value;
        const details = document.getElementById('details').value;

        if (title.length > 30 || summary.length > 100) {
            alert("El título debe tener menos de 30 caracteres y el resumen menos de 100 palabras.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('details', details);

        fetch('addNews.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            loadNews();
        })
        .catch(error => {
            console.error('Error:', error);
        });

        newPostForm.reset();
        modal.classList.add('hidden');
        modal.style.display = 'none'; // Ensure the modal is hidden
    });

    function loadNews() {
        fetch('getNews.php')
            .then(response => response.json())
            .then(data => {
                newsContainer.innerHTML = '';
                data.forEach(article => {
                    const articleElement = document.createElement('article');
                    const titleElement = document.createElement('h3');
                    const summaryElement = document.createElement('p');
                    const linkElement = document.createElement('a');

                    titleElement.textContent = article.title;
                    summaryElement.textContent = article.summary + " ";
                    linkElement.textContent = "Leer más";
                    linkElement.href = "#";
                    linkElement.addEventListener('click', function() {
                        const miniWindow = document.createElement('div');
                        miniWindow.classList.add('mini-window');
                        miniWindow.innerHTML = `
                            <div class="mini-window-content">
                                <span class="close-mini-window">&times;</span>
                                <h3>${article.title}</h3>
                                <p>${article.details}</p>
                            </div>
                        `;
                        document.body.appendChild(miniWindow);

                        const closeMiniWindow = miniWindow.querySelector('.close-mini-window');
                        closeMiniWindow.addEventListener('click', function() {
                            document.body.removeChild(miniWindow);
                        });
                    });

                    summaryElement.appendChild(linkElement);
                    articleElement.appendChild(titleElement);
                    articleElement.appendChild(summaryElement);
                    newsContainer.appendChild(articleElement);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    loadNews();
});

