import { Bank } from "./bank";

export class AkunBank extends Bank {
    public constructor (
        public bank: Bank,
        private saldo: number,  // private tidak bisa di akses oleh file lain
        protected noRekening: string, // protected bisa akses oleh anaknya
        public pemilik: string,
    ) {
        // Menggunakan super untuk memanggil constructor dari parent class
        // Dalam kasus ini, kita panggil constructor dari class Bank
        super(bank.nama, bank.alamat)  //
    }

    getPemilik() {
        console.log(this.pemilik)
    }

    getSaldo() {
        console.log(this.saldo)
    }

    getNoRekening() {
        console.log(this.noRekening)
    }

    deposit(jumlah: number) {
        if (jumlah <= 0 ) {
            console.log("Jumlah deposit harus lebih dari 0")
        }

        this.saldo += jumlah
    }

    tarik(jumlah: number) {
        if (jumlah <= 0) {
            console.log("Jumlah saldo harus lebih dari 0")
        }
        
        this.saldo -= jumlah
    }
}