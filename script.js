// 2 - Criando uma classe, com construtor
class Calculadora {
    constructor(saidaAnterior, saidaAtual) {
        this.saidaAnterior = saidaAnterior
        this.saidaAtual = saidaAtual
        this.clear()
    }
    // 3 - Criando as funções
    clear() {
        this.saidaAtual = ''
        this.saidaAnterior = ''
        this.operacao = undefined
    }

    deletar() {
        this.saidaAtual = this.saidaAtual.toString().slice(0, -1)
    }

    apendarNumero(numero) {
        if(numero === '.' && this.saidaAtual.includes('.')) return
        this.saidaAtual = this.saidaAtual.toString() + numero.toString()
    }

    escolherOperacao(operacao) {
        if(this.saidaAtual === '') return
        if(this.saidaAnterior !== '') {
            return this.computar
        }
        this.operacao = operacao
        this.saidaAnterior = this.saidaAtual
        this.saidaAtual = ''
    }

    computar() {
        let resultado
        const anterior = parseFloat(this.saidaAnterior)
        const atual = parseFloat(this.saidaAtual)
        if(isNaN(anterior) || isNaN(atual)) return
        switch(this.operacao) {
            case '+':
                resultado = anterior + atual
            break

            case '–':
                resultado = anterior - atual
            break

            case '×':
                resultado = anterior * atual
            break

            case '÷':
                resultado = anterior / atual
            break

            default:
                return
        }
        this.saidaAtual = resultado
        this.operacao = undefined
        this.saidaAnterior = ''
    }

    getDisplayNumero(numero) {
        const stringNumero = numero.toString()
        const integerDigits = parseFloat(stringNumero.split('.')[0])
        const decimalDigits = stringNumero.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        saidaAtual.innerText = this.getDisplayNumero(this.saidaAtual)
        if(this.operacao != null) {
            saidaAnterior.innerText = `${this.getDisplayNumero(this.saidaAnterior)} ${this.operacao}`
        } else {
            saidaAnterior.innerText = ''
        }
    }
}

// 1 - Declarando as constantes para selecionar os botões e as duas saídas
const botoesNumeros = document.querySelectorAll('[data-numero]')
const botoesoperacao = document.querySelectorAll('[data-operacao]')
const clear = document.querySelector('[data-clear]')
const deletar = document.querySelector('[data-delete]')
const equals = document.querySelector('[data-igual]')
const saidaAnterior = document.querySelector('[data-saida-anterior]')
const saidaAtual = document.querySelector('[data-saida-atual]')

// 4 - Instanciando um novo objeto
const calculadora = new Calculadora(saidaAnterior, saidaAtual)

botoesNumeros.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.apendarNumero(botao.innerText)
        calculadora.updateDisplay()
    })
})

botoesoperacao.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.escolherOperacao(botao.innerText)
        calculadora.updateDisplay()
    })
})

equals.addEventListener('click', botao => {
    calculadora.computar()
    calculadora.updateDisplay()
})

clear.addEventListener('click', botao => {
    calculadora.clear()
    calculadora.updateDisplay()
})

deletar.addEventListener('click', botao => {
    calculadora.deletar()
    calculadora.updateDisplay()
})


