function y1k3s() {
    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))

    let name1 = document.getElementById("name1").value

    let endpoint1 = "https://cataas.com/cat/cute/says/" + name1
    if (name1 != '') {
        toDataURL(endpoint1)
            .then(dataUrl => {
                dataUrl = dataUrl.split(",")
                dataUrl[0] = "data:image/png;base64";
                document.getElementById("image1").src = dataUrl;   //call to API
            })

    }

    let name2 = document.getElementById("name2").value

    let endpoint2 = "https://cataas.com/cat/cute/says/" + name2
    if (name2 != '') {
        toDataURL(endpoint2)
            .then(dataUrl => {
                dataUrl = dataUrl.split(",")
                dataUrl[0] = "data:image/png;base64";
                document.getElementById("image2").src = dataUrl;   //call to API
            })
    }

    let name3 = document.getElementById("name3").value

    let endpoint3 = "https://cataas.com/cat/cute/says/" + name3
    if (name3 != '') {
        toDataURL(endpoint3)
            .then(dataUrl => {
                dataUrl = dataUrl.split(",")
                dataUrl[0] = "data:image/png;base64";
                document.getElementById("image3").src = dataUrl;   //call to API
            })
    }


    let name4 = document.getElementById("name4").value

    let endpoint4 = "https://cataas.com/cat/cute/says/" + name4
    if (name4 != '') {
        toDataURL(endpoint4)
            .then(dataUrl => {
                dataUrl = dataUrl.split(",")
                dataUrl[0] = "data:image/png;base64";
                document.getElementById("image4").src = dataUrl;   //call to API
            })
    }
}