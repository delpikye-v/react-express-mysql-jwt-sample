import React from "react";
import { Link } from 'react-router-dom'

import ServiceComponent from "./service.component";

import IconSerivce from './assets/01-assets.png'
import IconAccounting from './assets/02-accounting.png'
import IconHrAdmin from './assets/03-hr-admin.png'
import IconSales from './assets/04-sales.png'
import IconCustomer from './assets/05-customer.png'
import IconSercurity from './assets/06-sercurity.png'

import "./template.styles.scss";
import InfoPriceComponent from "./info-price.component";

const TemplateComponent = () => {
    return (
        <>
            {/* block header */}
            <div className="header">
                <div className="block-left">
                    <div className="header-layout5">
                        <div className="logo"></div>
                        <Link to="/" className="home">Home</Link>
                        {/* <div className="home"></div> */}
                    </div>

                    <div className="header-content">
                        <span>
                            <div>Asia IT</div>
                            <div>Market Place</div>
                        </span>
                    </div>
                </div>

                <div className="block-right">
                    <div className="header-layout5">
                        <div className="frame-8">
                            <ul>
                                <li>
                                    <span className="dropdown-link">En</span>
                                </li>
                                <li>
                                    <span className="dropdown-link">Company</span>
                                </li>
                                <li>
                                    <span className="dropdown-link">Patner Market Place</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="header-content">
                        <div className="nav-link">
                            <Link to="/">Auto Homepage</Link>
                            <Link to="/">Sales</Link>
                            <Link to="/">CRM</Link>
                            <Link to="/">Electronic office</Link>
                            <Link to="/">Cloud ERP</Link>
                            <Link to="/">SSL</Link>
                        </div>

                        <div className="frame-1">
                            <div>Now</div>
                            <div>Future</div>
                        </div>

                        <div className="frame-2">
                            <div>6 <small>different <br />IT Software <br /> Networks</small></div>
                            <div>32 <small>patners</small></div>
                            <div>4 <small>countries</small></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* block title */}
            <div className="block-title">
                <p>
                    You are now viewing an <span>IT Software</span> that has been verified by <span>over 1 million users.</span>
                </p>
            </div>

            {/* block content */}
            <div className="block-content">
                <div className="title">IT CLOUD SEA'S IT SERVICE</div>

                <ServiceComponent
                    label='assets'
                    listData={[{
                        name: 'Invetory Management',
                        link: 'G-Book'
                    }]}
                    icon={IconSerivce}
                />

                <ServiceComponent
                    label='Accounting'
                    listData={[{
                        name: 'Accounting',
                        link: 'G-Book'
                    }]}
                    isOdd={false}
                    icon={IconAccounting}
                    backgroundColor="#F4F4F4"
                />

                <ServiceComponent
                    label='hr & admin'
                    listData={[
                        {
                            name: 'Webmail',
                            link: 'E-office'
                        },
                        {
                            name: 'E-Apporval',
                            link: 'E-office'
                        },
                        {
                            name: 'E-Document',
                            link: 'E-office'
                        },
                        {
                            name: 'E-Check in.out',
                            link: 'E-office'
                        },
                        {
                            name: 'Co-work/Project',
                            link: 'E-office'
                        }
                    ]}
                    icon={IconHrAdmin}
                />

                <ServiceComponent
                    label='Sales'
                    listData={[{
                        name: <>Create Homepage <br/> Youtube & Instagram</>,
                        link: 'Fieldmake'
                    }]}
                    isOdd={false}
                    icon={IconSales}
                    backgroundColor="#F4F4F4"
                />

                <ServiceComponent
                    label='Customer'
                    listData={[{
                        name: 'Customer Request Management',
                        link: 'OQUFIE'
                    }]}
                    icon={IconCustomer}
                />

                <ServiceComponent
                    label='Security'
                    listData={[{
                        name: 'SSL server',
                        link: 'SECTIGO'
                    }]}
                    isOdd={false}
                    icon={IconSercurity}
                    backgroundColor="#F4F4F4"
                />
            </div>

            {/* block footer */}
            <div className="block-footer">
                <InfoPriceComponent
                    label='Free Test'
                    description='Organize across all apps by hand'
                />

                <InfoPriceComponent
                    label='Low Price'
                    description='Monthly Fixed Amount'
                    price={'200.000'}
                />

                <InfoPriceComponent
                    label='Easy Using Methods'
                    description='Various Manual'
                    price={'200.000'}
                    borderColor = '#E6367E'
                />

                <InfoPriceComponent
                    label='Verify IT Serivce'
                    description='On sale in 4 countries'
                    price={'300.000'}
                    unit="VND"
                    color='#fff'
                    borderColor = '#E6367E'
                    backgroundColor="#E6367E"
                />
            </div>

            {/* footer */}
            <div className="footer">
                <div>
                    <h5>Vietname Office</h5>
                    <small>14F.APTower. Dien Bien Phu Street, D3, <br />Ho Chi Minh City</small>
                    <small>Business resigtration: 0315421202</small>
                    <small>
                        <div>Tel: 028-3520-2367</div>
                        <div>sales@dkinno.com</div>
                    </small>
                    <small>Copyright 2021 DaouKiwoom Innocation C0., Ltd</small>
                </div>

                <div>
                    <h5>Indonesia Office</h5>
                    <small>Menara Mandiri II, Jl. jend. Sudirman No.54-55, <br />South Jakarta, DKI Jakarta 12190, Indonsia</small>
                    <small>Tel: +62-21-5082-0038</small>
                </div>

                <div>
                    <h5>Korea Office</h5>
                    <small>5th Fl, C-dong, PDC, 242, Pangyo-ro, Bundang-gu, <br /> Seongnam-si, Gyeonggi-do, Korea</small>
                </div>
            </div>
        </>
    );
};

export default TemplateComponent;
