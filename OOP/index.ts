import { AkunBank } from "./akun";
import { Bank } from "./bank";

const BSI = new Bank("Bank Syariah Indonesia", "Jakarta")
const BCA = new Bank("Bank Central Asia", "SCBD")
// BSI.getNama()
// BSI.getAlamat()
// BCA.getNama()
// BCA.getAlamat()

const Ucup = new AkunBank(BSI, 10000000, "111111111", "Yusuf Ramadhani")



Ucup.getNama()
Ucup.getPemilik()
Ucup.getSaldo()
Ucup.getNoRekening()

Ucup.deposit(150000)
Ucup.getSaldo()
Ucup.tarik(10000000)
Ucup.getSaldo()

