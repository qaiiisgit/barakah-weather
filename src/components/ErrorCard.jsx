import React from 'react'

const ErrorCard = ({ message, onRetry, type = 'error' }) => {

    const configs = {
        error: {
            icon: '⚠️',
            title: 'Something went wrong',
            bg: 'bg-red-500/10 ',
            border: 'border-red-500/20',
            btn: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30',
        },
        permission: {
            icon: '📍',
            title: 'Location Required',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/30',
            btn: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30',

        },
        empty: {
            icon: '🔍',
            title: 'No Data Found',
            bg: 'bg-slate-500/10',
            border: 'border-slate-500/20',
            btn: 'bg-slate-500/20 hover:bg-slate-500/30 text-slate-400 border border-slate-500/30',
        },
    };

    const config = configs[type] || configs.error;

    return (
        <div className={"rounded-2xl p-5 ${config.bg} border ${config.border} text-center animate-fade-in"}>
            <div className="text-4xl mb-3">{config.icon}</div>
            <h3 className="text-slate-200 font-semibold mb-2">{config.title}</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">{ }{message}</p>
            {
                onRetry && (
                    <button onClick={onRetry}
                        className={"px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${config.btn}"}>
                        Try Again
                    </button>
                )
            }

        </div>
    )
}

export default ErrorCard
