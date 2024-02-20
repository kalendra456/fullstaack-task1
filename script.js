// Fetch JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const itemsPerPage = 5;
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const paginationElement = document.getElementById('pagination');
        const dataListElement = document.getElementById('dataList');

        createPaginationLinks(totalPages);

        function createPaginationLinks(totalPages) {
            const firstButton = createPaginationButton('First', 1);
            const previousButton = createPaginationButton('Previous', 1);
            
            paginationElement.appendChild(firstButton);
            paginationElement.appendChild(previousButton);

            for (let i = 1; i <= totalPages; i++) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = i;
                a.addEventListener('click', () => handlePaginationClick(i));

                li.appendChild(a);
                paginationElement.appendChild(li);
            }
        }

        function createPaginationButton(text, pageNumber) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = text;
            a.addEventListener('click', () => handlePaginationClick(pageNumber));

            li.appendChild(a);
            return li;
        }

        function handlePaginationClick(pageNumber) {
            const startIndex = (pageNumber - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentPageData = data.slice(startIndex, endIndex);

            dataListElement.innerHTML = '';

            currentPageData.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.id}: ${item.name} - ${item.email}`;
                dataListElement.appendChild(li);
            });

            // Update "First" and "Previous" button logic
            const firstButton = paginationElement.querySelector('li:first-child a');
            const previousButton = paginationElement.querySelector('li:nth-child(2) a');

            firstButton.removeEventListener('click', handlePaginationClick);
            previousButton.removeEventListener('click', handlePaginationClick);

            if (pageNumber > 1) {
                firstButton.addEventListener('click', () => handlePaginationClick(1));
                previousButton.addEventListener('click', () => handlePaginationClick(pageNumber - 1));
            } else {
                firstButton.classList.add('disabled');
                previousButton.classList.add('disabled');
            }
        }

        // Initial display on page load
        handlePaginationClick(1);
    });
