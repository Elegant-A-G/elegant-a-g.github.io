const API_ENDPOINT = 'https://api.elegantag.com';

async function sendGetApiRequest(endpoint) {
    let options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    return await fetch(API_ENDPOINT + endpoint, options).then(handleResponse).catch(console.error);
}


async function sendPostApiRequest(endpoint, body) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    };

    return await fetch(API_ENDPOINT + endpoint, options).then(handleResponse).catch(console.error);
}

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

async function getCatalog() {
    return await sendGetApiRequest("/v1/catalog");
}

export {
    sendPostApiRequest,
    sendGetApiRequest,
    handleResponse,
    getCatalog
}
