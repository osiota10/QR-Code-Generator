const themeName = document.getElementById('theme-label')
const bodyThemeTitle = document.querySelector('#body')


// JavaScript code
const toggle = document.querySelector('.theme-toggle');

toggle.addEventListener('click', () => {
    const result = toggle.classList.toggle('active');
    result ? themeName.textContent = 'Dark Theme' : themeName.textContent = 'Light Theme'
    bodyThemeTitle.classList.toggle('dark-theme')
});


//Text Input Data
textInputData = document.querySelector('#data');

// COLORS
//Color Inputs
mainColorPicker = document.querySelector('#qr-code-color')
backgroundColorPicker = document.querySelector('#bg-color')

//Color Inputs Values
mainColorValue = document.querySelector('#qr-color-value')
backgroundColorValue = document.querySelector('#bg-color-value')

const updateMainColor = e => {
    const value = e.target.value;
    mainColorValue.innerText = value;
};

const updateBackgroundColor = e => {
    const value = e.target.value
    backgroundColorValue.innerText = value
};

//Event Listener for color
const addColorEventListener = () => {
    mainColorPicker.addEventListener('change', updateMainColor);
    backgroundColorPicker.addEventListener('change', updateBackgroundColor);
};

addColorEventListener();

// SLIDERS
const sizeSliderPicker = document.querySelector('#size')
const marginSliderPicker = document.querySelector('#margin')

const sizeSliderValue = document.querySelector('#size-value')
const marginSliderValue = document.querySelector('#margin-value')

const updateSizeSlider = e => {
    const value = e.target.value
    sizeSliderValue.innerText = `${value} x ${value}`
}

const updateMarginSlider = e => {
    const value = e.target.value
    marginSliderValue.innerHTML = `${value}px`
}

//Slider EventListener
const addSliderEventListener = () => {
    sizeSliderPicker.addEventListener('change', updateSizeSlider)
    marginSliderPicker.addEventListener('change', updateMarginSlider)
}

addSliderEventListener()

//IMAGE FORMAT
const imageFormat = document.querySelector('input[name="format"]:checked')

//SUBMIT
const submitButton = document.querySelector('#submit')

const prepareParameters = (params) => {
    return {
        data: params.data,
        size: `${params.size}x${params.size}`,
        color: params.color.replace('#', ''),
        bgcolor: params.bgColor.replace('#', ''),
        qzone: params.qZone,
        format: params.format,
    }
}

const settingsContainer = document.querySelector('#qr-code-settings')
const resultContainer = document.querySelector('#qr-code-result')
const qrCodeImage = document.querySelector('#qr-code-image')

const showQrCode = (imgUrl) => {
    settingsContainer.classList.add('flipped')
    resultContainer.classList.add('flipped')
    qrCodeImage.setAttribute('src', imgUrl)
}

const getQrCode = parameters => {
    const urlParams = new URLSearchParams(parameters).toString()
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/'
    const completeUrl = `${baseUrl}?${urlParams}`

    fetch(completeUrl).then(response => {
        if (response.status === 200) {
            showQrCode(completeUrl)
        }
    })
}

const onSubmit = () => {
    const data = textInputData.value
    const color = mainColorPicker.value
    const bgColor = backgroundColorPicker.value
    const size = sizeSliderPicker.value
    const qZone = marginSliderPicker.value
    const format = document.querySelector('input[name="format"]:checked').value

    const parameters = prepareParameters({ data, color, bgColor, size, qZone, format })

    getQrCode(parameters)
}

//Button EventListener
const addSubmitEventListener = () => {
    submitButton.addEventListener('click', onSubmit)
}

addSubmitEventListener();


// Download QR Code Logic
const downloadButton = document.querySelector('#download-btn')

const downloadQrCodeImage = () => {
    // // Create a new anchor element
    // const downloadLink = document.createElement('a');
    // // Set the href attribute to the image source URL
    // downloadLink.href = qrCodeImage.src;
    // // Set the download attribute to the image file name
    // downloadLink.download = 'generatedQrCode.jpg';
    // // Append the anchor element to the DOM
    // document.body.appendChild(downloadLink);
    // // Click the anchor element to start the download
    // downloadLink.click();
    // // Remove the anchor element from the DOM
    // document.body.removeChild(downloadLink);
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCodeImage.src;
    downloadLink.download = 'generatedQrCode.jpg';
    document.body.appendChild(downloadLink);

    if (typeof downloadLink.download === 'undefined') {
        // Browser doesn't support download attribute
        const blob = new Blob([qrCodeImage.src], { type: 'image/jpeg' });
        const url = window.URL.createObjectURL(blob);
        downloadLink.setAttribute('href', url);
        downloadLink.setAttribute('target', '_blank');
    }

    downloadLink.click();
    document.body.removeChild(downloadLink);

}

downloadButton.addEventListener('click', downloadQrCodeImage)

// Edit Functionality
const editButton = document.querySelector('#edit')

const handleEdit = () => {
    settingsContainer.classList.remove('flipped');
    resultContainer.classList.remove('flipped');
}

const addEditEventListener = () => {
    editButton.addEventListener('click', handleEdit)
}

addEditEventListener()