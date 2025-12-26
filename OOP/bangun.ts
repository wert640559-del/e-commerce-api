abstract class Shape {
    abstract hitungLuas(): number
    abstract hitungKeliling(): number

    deskripsi() {
        return `Luas: ${this.hitungLuas()}, Keliling: ${this.hitungKeliling()}`
    }
}

export class Persegi extends Shape {
    constructor(private sisi: number) {
        super()
    }

    hitungLuas(): number {
        return this.sisi * this.sisi
    }

    hitungKeliling(): number {
        return this.sisi * 4
    }
}

export class Lingkaran extends Shape {
    constructor(private radius: number) {
        super()
    }

    hitungKeliling(): number {
        return 2 * Math.PI * this.radius
    }

    hitungLuas(): number {
        return Math.PI * this.radius ** 2 // pangkat 2
    }
}

const persegi = new Persegi(5)
console.log(persegi.deskripsi())
console.log(persegi.hitungKeliling())
console.log(persegi.hitungLuas())

// Abstract class tidak dapat di-instantiate, karena itu hanya sebuah kontrak atau blueprint untuk kelas lainnya. Kita tidak dapat membuat instance dari kelas abstrak. Jika kita mencoba membuat instance, maka kompiler akan menghasilkan error.
