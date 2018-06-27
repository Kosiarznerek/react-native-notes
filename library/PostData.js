/**
 * Sending data object via POST
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * @param {string} url
 * @param {Object} data
 * @return {Promise<T>}
 */
const PostData = (url, data) => fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
})
    .then(response => response.json())
    .catch(reason => console.log(reason));

export default PostData;