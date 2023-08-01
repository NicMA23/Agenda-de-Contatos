const nome = document.getElementById('nome-completo')
const form = document.getElementById('form')
const errorName = document.getElementById('error-name')
const tel = document.getElementById('telefone')
const errorNum = document.getElementById('error-num')
let linhas = ''

function verifyName(nome) {
    const nomeArray = nome.split(' ')
    return nomeArray.length > 1
}

function Nan(nome) {
    return isNaN(nome)
}

function fixName(nome) {
    return nome.replace(/\b\w/g, char => char.toLocaleUpperCase());
}

function preventNum(nome) {
    const ilegalNuns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const nomeArray = nome.split('')
    for (i = 0; i < nomeArray.length; i++) {
        if (ilegalNuns.includes(nomeArray[i])) {
            return false
        }
    }
    return true
}

function fixTel(tel) {
    const telArray = tel.split('')
    for (i = 0; i < telArray.length; i++) {
        if (i === 0) {
            telArray.splice(i, 0, '(+')
        } if (i === 3) {
            telArray.splice(i, 0, ')')
        } if (i === 4) {
            telArray.splice(i, 0, ' ')
        } if (i === 9) {
            telArray.splice(i, 0, '-')
        }
    }
    return telArray.join('')
}

form.addEventListener('submit', function (e) {
    e.preventDefault()

    const isVerifyName = verifyName(nome.value)
    const isNum = Nan(tel.value)
    const noIlegalNum = preventNum(nome.value)

    if (isVerifyName && !isNum && noIlegalNum) {
        const telFixed = fixTel(tel.value)
        const nomeFixed = fixName(nome.value)
        errorNum.style.display = 'none'
        errorName.style.display = 'none'
        nome.classList.remove('error')
        tel.classList.remove('error')

        let linha = '<tr>'
        linha += `<td>${nomeFixed}</td>`
        linha += `<td>${telFixed}</td>`
        linha += '<td>'

        linhas += linha

        const body = document.getElementById('tbody')
        body.innerHTML = linhas

        tel.value = ''
        nome.value = ''

    } else if (!isVerifyName || !noIlegalNum && !isNum) {
        errorNum.style.display = 'none'
        errorName.style.display = 'block'
        nome.classList.add('error')
        tel.value = tel.value
        nome.value = nome.value
    } else if (isNum && isVerifyName || noIlegalNum) {
        errorNum.style.display = 'block'
        errorName.style.display = 'none'
        tel.classList.add('error')
        tel.value = tel.value
        nome.value = nome.value
    } else {
        errorNum.style.display = 'block'
        errorName.style.display = 'block'
        nome.classList.add('error')
        tel.classList.add('error')
        tel.value = tel.value
        nome.value = nome.value
    }
})