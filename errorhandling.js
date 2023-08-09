
// Catch Async demonstration

// async function fun () {
    
//     throw new Error("Message")
// }

// console.log(fun().catch(() => console.log("Hello")))

// try {
//     fun();
// } catch(err) {
//     console.log("Error occur")
// }

// Promise.resolve(fun()).catch((err) => console.log("In catch"))

// Promise.resolve(fun()).catch((err) => console.log("Error"));
// console.log("Hello")

// const catchAsync = (fun) => {

//     return () => {
//         try {
//             fun()
//         } catch(err) {
//             console.log("Error handled");
//             // Promise.resolve().catch((err) => console.log("Error"));  
//         }
//     }
// }

// const fun = catchAsync(() => {

//     throw new Error("Message")
// })

// catchAsync()

