function convertToFormat(angka) {
    if (angka != '') {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        // for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        // for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return  rupiah.split('', rupiah.length - 1).reverse().join('');
    }
}


export default convertToFormat