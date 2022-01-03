import React, { useCallback } from 'react'

const ServiceComponent = ({ icon, label, isOdd = true, listData = [], backgroundColor='#fff' }) => {
    const contentClass = useCallback(
        () => {
            return `t-content ${listData.length > 1 ? 'col-4' : ''}`.trim()
        },
        [listData],
    )
    return (
        <div className={"info"} style={{ backgroundColor }}>
            {isOdd && <div className="col-5 t-icon"><div className="icon" style={{ background: `url(${icon}) no-repeat center` }}></div></div>}

            <div className="col-6 t-description">
                <div className="t-label">{label}</div>

                <div className="t-data">
                    {
                        listData.map((item, index) => {
                            return (
                                <div className={contentClass()} key={index}>
                                    <div className="i-label">{item.name}</div>
                                    <div className="a-label">{item.link}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {!isOdd && <div className="col-4 t-icon"><div className="icon" style={{ background: `url(${icon}) no-repeat center` }}></div></div>}
        </div>
    )
}

export default ServiceComponent
