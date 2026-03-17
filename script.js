const input = document.getElementById('postIdInput');
const viewPostBtn = document.getElementById('viewPostBtn');
const viewAllBtn = document.getElementById('viewAllBtn');
const container = document.getElementById('postsContainer');
const loading = document.getElementById('loading');


function createPostCard(post) {
    return `
        <div class="card">
            <h3>${post.id}. ${post.title}</h3>
            <p>${post.body}</p>
        </div>
    `;
}


viewPostBtn.addEventListener('click', async () => {
    const id = input.value;
    if (!id) return alert("გთხოვთ შეიყვანოთ ID");

    container.innerHTML = '';
    loading.style.display = 'block';

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) {
            throw new Error("პოსტი ვერ მოიძებნა");
        }
        const post = await response.json();
        container.innerHTML = createPostCard(post);
        container.className = ''; 
    } catch (error) {
        container.innerHTML = `<p class="error">${error.message}</p>`;
    } finally {
        loading.style.display = 'none';
    }
});


viewAllBtn.addEventListener('click', async () => {
    container.innerHTML = '';
    loading.style.display = 'block';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();

        container.className = 'grid'; 
        container.innerHTML = posts.map(post => createPostCard(post)).join('');
    } catch (error) {
        container.innerHTML = `<p class="error">მოხდა შეცდომა მონაცემების წამოღებისას</p>`;
    } finally {
        loading.style.display = 'none';
    }
});
