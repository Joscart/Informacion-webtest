document.addEventListener('DOMContentLoaded', function() {
    console.log('News page loaded');

    const newPostForm = document.getElementById('newPostForm');
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('openModalButton');
    const closeModalButton = document.getElementById('closeModalButton');
    const newsContainer = document.getElementById('newsContainer');

    openModalButton.addEventListener('click', function() {
        modal.classList.remove('hidden');
        modal.style.display = 'block';
    });

    closeModalButton.addEventListener('click', function() {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    });

    newPostForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const summary = document.getElementById('summary').value;
        const details = document.getElementById('details').value;

        if (title.length < 30 || summary.length < 100) {
            alert("El título debe tener al menos 30 caracteres y el resumen al menos 100 palabras.");
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
                    const dateElement = document.createElement('small');

                    titleElement.textContent = article.title;
                    summaryElement.textContent = article.summary + " ";
                    linkElement.textContent = "Leer más";
                    linkElement.href = "#";
                    linkElement.addEventListener('click', function() {
                        alert(article.details);
                    });

                    dateElement.textContent = new Date(article.created_at).toLocaleDateString();

                    summaryElement.appendChild(linkElement);
                    articleElement.appendChild(titleElement);
                    articleElement.appendChild(summaryElement);
                    articleElement.appendChild(dateElement);
                    newsContainer.appendChild(articleElement);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    loadNews();
});

