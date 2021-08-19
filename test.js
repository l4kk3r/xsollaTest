const jwt = require('jsonwebtoken')

const config = require('./config.json')

async function main()  {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE3LCJpYXQiOjE2MjkzNjc1MzIsImV4cCI6MTYyOTM2NzY1Mn0.WbkloW1s07LFK7pq0u4UcuTmaWFLpzYEsKT7sTkk6KI.eyJfaWQiOjE3LCJpYXQiOjE2MjkzNjY1NTUsImV4cCI6MTYyOTM2NjYxNX0.OdhCcDrQDrnuLCYDIQL-lGoH-VnWoBrN_iGvlbN17TU.eyJfaWQiOjE3LCJpYXQiOjE2MjkzNjU3MzUsImV4cCI6MTYyOTM2NTc5NX0.2D5mCzl3-z-Qg_K5X4jB_PItWjU8Zn9UKQLIKNYYV-4.eyJfaWQiOjE3LCJpYXQiOjE2MjkzNjUxMjgsImV4cCI6MTYyOTM2NTE4OH0.HrZzomV6sUxt8NMHCNGHl982ybbaUpsJO9wBJjYOxRE'
    console.log(token)

    const secret = config.JWT_ACCESS_TOKEN_SECRET
    console.log({ secret })
    const dataR = jwt.verify(token, secret)
    console.log(dataR)
}

main()