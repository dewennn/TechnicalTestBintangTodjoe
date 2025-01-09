import React, { useState } from 'react'

const App = () => {
  const[kalimat, setKalimat] = useState('')
  const[segitiga, setSegitiga] = useState('')
  const[angka, setAngka] = useState('')
  const[result, setResult] = useState('')
  const[mid, setMid] = useState(false)

  const handleKalimatChange = (e) => {
    setKalimat(e.target.value)
  }

  const handleSegitigaChange = (e) => {
    setSegitiga(e.target.value)
  }

  const handleAngkaChange = (e) => {
    setAngka(e.target.value)
  }

  const handleProcess = () => {
    if (kalimat) {
      // jadiin array
      let formattedKalimat = kalimat.trim().split('')
      
      // aturan untuk ' dan kata kedua akhir kata
      for (let i = 0; i < formattedKalimat.length; i++) {
        if (i == 0) continue
        
        if (formattedKalimat[i] == " ") {
          formattedKalimat[i - 2] = formattedKalimat[i - 2].toUpperCase()
        }
        else if(i == formattedKalimat.length - 1){
          formattedKalimat[i - 1] = formattedKalimat[i - 1].toUpperCase()
        }
        else if (formattedKalimat[i] == "\'") {
          if (i == formattedKalimat.length - 1) continue
          
          formattedKalimat[i-1] = formattedKalimat[i-1].toUpperCase()
          formattedKalimat[i+1] = formattedKalimat[i+1].toUpperCase()
        }
      }

      // awal akhir
      formattedKalimat[0] = formattedKalimat[0].toUpperCase()
      formattedKalimat[formattedKalimat.length-1] = formattedKalimat[formattedKalimat.length-1].toUpperCase()

      // balikin jadi String
      formattedKalimat = formattedKalimat.join('')
      setMid(false)
      setResult(formattedKalimat)
    }
    else if (segitiga) {
      let resp = ''
      let nums = [1]
      let ctr = 1
      
      // simpan row sblumnya di nums
      while (ctr <= segitiga) {
        let row = []

        // kalo ujung kasih 1, kalau tidak ambil dari row sebelumnya
        for (let i = 0; i < ctr; i++) {
          if (i === 0 || i === ctr - 1) {
            row.push(1)
          } else {
            row.push(nums[i - 1] + nums[i])
          }
        }
  
        resp += row.join(' ') + '>rb<'
        nums = row
        ctr++
      }
      
      // reverse string, gunakan state untuk ubah alignment text
      let reversed = resp.split('').reverse().join('')
      setResult('')
      setMid(true)
      document.getElementById("result").innerHTML = reversed
    }
    else if(angka){
      let resp = ''
      let num = 0
      let ctr = 0
      let add = 2

      // tambah terus resp dengan aturan ini sampai melebihi angka
      while(num < angka){
        num += add

        if(ctr == 4){
          resp += String(num) + '<br>'
          add = add == 2 ? 1 : 2
          ctr = 0
        }
        else{
          resp += String(num) + ' '
          ctr++
        }
      }

      // bikin kosong ganti via id biar bs ke detect
      setResult('')
      setMid(false)
      document.getElementById("result").innerHTML = resp
    }
  }

  return (
    <div className='p-10'>
      <h1 className='font-bold text-2xl mb-5'>Form1</h1>

      <div>
        <h1 className='font-semibold text-lg mb-5'>Welcome, BUDI</h1>

        <div className='flex flex-col gap-8'>
          <label htmlFor="kalimat" className='flex'>
            <h1 className='w-52'>Masukan, sebuah kalimat:</h1>
            <textarea id="kalimat" className='border border-black ml-4 w-64 h-64 align-top p-2 leading-none' onChange={handleKalimatChange}></textarea>
          </label>

          <label htmlFor="segitiga" className='flex'>
            <h1 className='w-52'>Masukan banyak segitiga:</h1>
            <input id="segitiga" type="text" className='border border-black ml-4 w-64 align-top p-2' onChange={handleSegitigaChange}/>
          </label>

          <label htmlFor="angka" className='flex'>
            <h1 className='w-52'>Masukan angka:</h1>
            <input id="angka" type="text" className='border border-black ml-4 w-64 align-top p-2' onChange={handleAngkaChange}/>
          </label>

          <div className='flex'>
            <h1 className='w-52'></h1>
            <div className='w-64 flex justify-center'>
              <button
                className='px-4 py-2 border-2 bg-gray-300'
                onClick={() => {handleProcess()}}
              >
                Process
              </button>
            </div>
          </div>

          <label htmlFor="result" className='flex'>
            <h1 className='w-52'>Result:</h1>
            <div id="result" type="text" className={`border border-black ml-4 w-64 h-64 align-top p-2 overflow-scroll ${mid ? 'text-center' : 'text-left'}`}>
              {result}
            </div>
          </label>
        </div>

      </div>
    </div>
  )
}

export default App