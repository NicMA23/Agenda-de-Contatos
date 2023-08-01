const nome = document.getElementById('nome-completo')
const form = document.getElementById('form')
const errorName = document.getElementById('error-name')
const tel = document.getElementById('telefone')
const errorNum = document.getElementById('error-num')
const trashBin = document.querySelector('.trash-bin')
let linhas = []

function verifyName(nome) {
    const nomeArray = nome.split(' ')
    return nomeArray.length > 1
}

function Nan(nome) {
    return isNaN(nome)
}

function fixName(nome) {
    return nome.replace(/\b\w/g, char => char.toLocaleUpperCase())
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
        linha += `<td class="trash-bin"><span class="material-symbols-outlined" id="trash-bin">delete</span></td>`
        linha += '</tr>'

        linhas.push(linha)

        const body = document.getElementById('tbody')
        body.innerHTML = linhas.join('')

        tel.value = ''
        nome.value = ''

    } else {
        errorNum.style.display = 'none'
        errorName.style.display = 'none'
        nome.classList.remove('error')
        tel.classList.remove('error')

        if (!isVerifyName) {
            errorName.style.display = 'block'
            nome.classList.add('error')
        }

        if (isNum) {
            errorNum.style.display = 'block'
            tel.classList.add('error')
        }

        if (!noIlegalNum) {
            errorName.style.display = 'block'
            nome.classList.add('error')
        }
    }
})

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('material-symbols-outlined')) {
        const row = e.target.closest('tr')
        const linhaValor = linhas.indexOf(row.outerHTML)
        if (linhaValor !== -1) {
            linhas.splice(linhaValor, 1)
            const body = document.getElementById('tbody')
            body.innerHTML = linhas.join('')
        }
    }
})