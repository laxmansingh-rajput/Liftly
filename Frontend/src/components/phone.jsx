import React, { useState, useRef } from 'react'
import logo from '../assets/logo.png'
import Loader from './loader'
import axios from 'axios'
import edit from '../assets/edit.svg'
import { useDetails } from '../customHooks/useDetails'


const Phone = () => {
  const [load, setload] = useState(false)
  const [next, setnext, details, setdetails] = useDetails('phone', setload)
  const [lock, setlock] = useState(false)
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [otpVisible, setOtpVisible] = useState(false)
  const [err, seterr] = useState("")
  const [otperror, setotperror] = useState("")

  const inputRefs = useRef([])

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handelSend = async () => {
    if (/^[0-9]{10}$/.test(phone)) {
      try {

        let response = await axios.post(
          "http://localhost:3000/form/phone",
          { phone: phone },
          { withCredentials: true }
        )

        if (response.data.success) {
          setOtpVisible(true)
          setlock(true)
        } else {
          seterr('Failed to send OTP')
          setTimeout(() => seterr(''), 3000)
        }

      } catch (err) {
        seterr("Server error")
        setTimeout(() => seterr(''), 3000)
      }

    } else {
      seterr('Enter valid number')
      setTimeout(() => seterr(''), 3000)
    }
  }
  const handelVerify = async () => {
    if (otp.join("").length === 6) {
      try {

        let response = await axios.post(
          "http://localhost:3000/form/verify-phone",
          { phone: phone, otp: otp.join("") },
          { withCredentials: true }
        )
        if (response.data.success) {
          window.location.href = 'http://localhost:5173/home'
        }
      } catch {
        setotperror('Enter valid otp')
        setTimeout(() => setotperror(''), 3000)
      }
    } else {
      setotperror('Enter valid otp')
      setTimeout(() => setotperror(''), 3000)
    }
  }
  return (
    <div className='h-full w-full bg-primary-background text-primary-title flex flex-col items-center justify-center px-5 py-5 gap-5'>
      {
        (load) ? <Loader /> :
          <div className='h-full w-full bg-primary-background text-primary-title flex flex-col items-center justify-center gap-5'>
            <div className='flex items-center justify-center gap-3 w-full'>
              <img className='h-20 select-none' src={logo} alt="" />

              <div className='flex flex-col items-center justify-center gap-2'>
                <div className='text-4xl font-bold'>LiftLy</div>

                <div className='font-semibold text-primary-subtitle'>
                  SHARE YOUR COMMUTE
                </div>
              </div>
            </div>

            <div className='w-full border-2 rounded-xl bg-primary-card-background border-primary-card-border flex flex-col gap-5 p-6'>

              <div className='text-xl font-bold text-center'>
                Verify Phone Number
              </div>


              <div className='flex flex-col gap-2 relative'>

                <div className='text-sm font-semibold'>
                  Phone Number*
                </div>
                {
                  lock && <img src={edit} className='absolute right-2 h-6 bottom-2' onClick={() => {
                    setlock(false)
                    setOtpVisible(false)
                  }} alt="" />
                }

                <input
                  placeholder='Enter phone number'
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={
                    (e) => {
                      if (!lock) {
                        const value = e.target.value.replace(/\D/g, "")
                        setPhone(value)
                      }
                    }
                  }
                  className='border-2 h-10 rounded-md w-full px-2'
                />
              </div>


              <div className='text-sm text-red-500 font-semibold w-full text-center h-2'>
                {err}
              </div>


              {!otpVisible && (
                <div className='h-20 w-full flex flex-col items-center gap-1'>

                  <button
                    className='h-10 w-full bg-primary-button rounded-md text-primary-background font-semibold'
                    onClick={(e) => handelSend()}
                  >
                    Send OTP
                  </button>

                </div>
              )}


              {otpVisible && (
                <>
                  <div className='text-sm text-primary-subtitle text-center'>
                    Enter the 6 digit OTP sent to your phone
                  </div>


                  <div className='flex justify-center gap-3'>

                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className='w-12 h-12 border-2 rounded-md text-center text-lg font-bold bg-transparent'
                      />
                    ))}

                  </div>

                  <div className='text-sm text-red-500 font-semibold w-full text-center h-2'>
                    {otperror}
                  </div>
                  <button
                    className='h-10 w-full bg-primary-button rounded-md text-primary-background font-semibold'
                    onClick={() => handelVerify()}
                  >
                    Verify OTP
                  </button>


                  <div className='text-sm text-center text-primary-subtitle'>
                    Didn't receive OTP?
                    <span
                      className='font-semibold cursor-pointer ml-1'
                      onClick={() => handelSend}
                    >
                      Resend
                    </span>
                  </div>
                </>
              )}

            </div>

          </div>
      }

    </div>
  )
}

export default Phone