const soma = (req, res) => {
    const a = 10;
    const b = 20;
    const soma = a + b;
    const result = "O resultado da soma entre " + a + " e " + b + " é: " + soma;

    res.send({
        result: result,
        soma: soma
    })
};

module.exports = {soma};