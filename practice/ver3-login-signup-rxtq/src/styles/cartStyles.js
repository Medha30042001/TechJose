
export const cartStyles = {

    pageWrapper : `min-h-screen bg-purple-50 px-6 py-8`, //used for bg color

    pageContainer : `max-w-7xl mx-auto`, //width of the content

    pageTitle : `md:text-4xl text-3xl mb-2
                font-bold text-slate-900`,

    pageSubtitle : `text-slate-600 mb-8`,

    content : `space-y-8`,

    cartCard : `bg-white p-6 
                rounded-2xl border border-purple-100 shadow-sm`,

    cartHeader : `flex flex-col 
                md:flex-row md:items-center md:justify-between
                gap-3 mb-5`,

    cartTitle : `text-xl font-bold text-slate-800`,
    
    cartMeta : `text-sm text-slate-500`,

    products : `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`,

    productCard : `border border-purple-200 rounded-xl
                    overflow-hidden 
                    bg-white
                    hover:shadow-md transition`,

    img : `w-full h-80 
            object-cover bg-purple-50/60`,


    productBody : `p-4 space-y-2`,

    productTitle : `text-base font-semibold
                    text-slate-900 line-clamp-2`, 
                    //line-clamp-2 truncates text to a maximum of two lines

    detail : `text-sm text-slate-600`,

    highlight : `text-sm font-semibold text-purple-700`,

    cartSummary : `mt-6 pt-5
                    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3
                    border-t border-purple-100 `,

    summaryItem : `bg-purple-50 rounded-xl p-3 flex gap-1`,

    summaryLabel : `text-sm text-slate-500`,

    summaryValue : `text-sm font-bold text-slate-800`,
}