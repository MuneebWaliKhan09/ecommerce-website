// import React, { useState } from 'react'

// export const AddContextCrumb = React.createContext({
//     bradCrumb: 'Add Product',
//     setBradCrumb: () => { },
//     addPr: () => { },
// });

// const AddContext = ({ children }) => {
//     const [bradCrumb, setBradCrumb] = useState('');

//     const addPr = (e) => {
//         setBradCrumb(e.currentTarget.title)
//         console.log(e.currentTarget.title)
//     }

//     return (
//         <div>
//             <AddContextCrumb.Provider value={{ bradCrumb, setBradCrumb, addPr }}>
//                 {children}
//             </AddContextCrumb.Provider>

//         </div>
//     )
// }

// export default AddContext