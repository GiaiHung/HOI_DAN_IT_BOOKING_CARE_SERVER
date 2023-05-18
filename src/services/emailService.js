import nodemailer from 'nodemailer'

const sendEmail = async (data) => {
  const { receiverEmail, name, time, doctorName, redirectLink, language } = data
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  const html =
    language === 'vi'
      ? `
      <h3>Xin chào ${name}</h3>
      <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên Booking Care.</p>
      <p>Thông tin đặt lịch khám bệnh:</p>
      <div>
        <b>Thời gian: ${time}</b>
        </br>
        <b>Bác sĩ: ${doctorName}</b>
      </div>
      <p>Nếu thông tin trên là đúng sự thật, bạn vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
      <div>
        <a href=${redirectLink} target='_blank'>Xác nhận</a>
      </div>
      <h4>
        <i>Xin chân thành cảm ơn</i>
      </h4>
    `
      : `
      <h3>Hello ${name}</h3>
      <p>You received this email because you've booked an appointment on Booking Care</p>
      <p>Information about appoinment:</p>
      <div>
        <b>Time: ${time}</b>
        </br>
        <b>Doctor: ${doctorName}</b>
      </div>
      <p>If all above information is true, please click the link below to successfully confirm your booking</p>
      <div>
        <a href=${redirectLink} target='_blank'>Confirm</a>
      </div>
      <h4>
        <i>Sincerely!</i>
      </h4>
    `

  let info = await transporter.sendMail({
    from: '"Booking care" <hunggiaitruong288@gmail.com>',
    to: receiverEmail,
    subject:
      language === 'vi'
        ? 'Thông tin đặt lịch khám bệnh'
        : 'Information about doctor shedule',
    html,
  })
}

const sendAttachment = async (data) => {
  const { language, email, imageBase64, name, patientId } = data
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  const html =
    language === 'vi'
      ? `
      <h3>Xin chào ${name}</h3>
      <p>Bạn nhận được email này vì bác sĩ đã xác nhận lịch khám bệnh trên Booking Care.</p>
      <p>Thông tin về hóa đơn / đơn thuốc được đính kèm bên dưới</p>
      <h4>
        <i>Xin chân thành cảm ơn</i>
      </h4>
    `
      : `
      <h3>Hello ${name}</h3>
      <p>You received this email because doctor has confirmed your schedule on Booking Care</p>
      <p>Invoice/prescription information is attached below</p>
      <h4>
        <i>Sincerely!</i>
      </h4>
    `

  let info = await transporter.sendMail({
    from: '"Booking care" <hunggiaitruong288@gmail.com>',
    to: email,
    subject:
      language === 'vi' ? 'Kết quả đặt lịch khám bệnh' : 'Doctor confirmation',
    html,
    attachments: {
      filename: `remedy-${patientId}-${new Date().getTime()}.png`,
      content: imageBase64.split('base64,')[1],
      encoding: 'base64',
    },
  })
}

export { sendEmail, sendAttachment }
