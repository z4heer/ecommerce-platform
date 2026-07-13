--
-- PostgreSQL database dump
--

\restrict GyhJAjBsSlbVNOpYlMEhbggh0TbAlHr04bVVb2oEfYXxc0U3ITTY7iJnpbfVCyD

-- Dumped from database version 17.10 (Debian 17.10-1.pgdg13+1)
-- Dumped by pg_dump version 17.10 (Debian 17.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO ecommerce_user;

--
-- Name: inventory; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public.inventory (
    id uuid NOT NULL,
    product_id uuid NOT NULL,
    stock_quantity integer NOT NULL,
    reserved_quantity integer NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.inventory OWNER TO ecommerce_user;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public.order_items (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    product_id uuid NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric(12,2) NOT NULL
);


ALTER TABLE public.order_items OWNER TO ecommerce_user;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public.orders (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    total_amount numeric(12,2) NOT NULL,
    status character varying NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.orders OWNER TO ecommerce_user;

--
-- Name: products; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public.products (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    category character varying(100) NOT NULL,
    price numeric(10,2) NOT NULL,
    is_active boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.products OWNER TO ecommerce_user;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public.roles (
    id uuid NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO ecommerce_user;

--
-- Name: users; Type: TABLE; Schema: public; Owner: ecommerce_user
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role_id uuid NOT NULL
);


ALTER TABLE public.users OWNER TO ecommerce_user;

--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public.alembic_version (version_num) FROM stdin;
cea3b87fde05
\.


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public.inventory (id, product_id, stock_quantity, reserved_quantity, updated_at) FROM stdin;
d9fec565-04e7-406a-bf6b-70525586e6e7	a2a49b2c-b5bd-410d-a9af-5dadc26ec1a0	500	0	2026-06-18 09:29:31.566082+00
9f26c7ac-74b6-48a1-a4b8-de41155fe7f1	94a2245a-58be-4698-9551-85bc85270b91	100	0	2026-06-18 09:32:08.252043+00
7863a130-7734-4f91-b1c3-2982f1f92bc9	d1850b13-958b-422d-974f-017a23278beb	100	0	2026-06-19 14:37:59.463179+00
649eb085-9cbd-4de8-a46c-a4260b05d16e	20417835-c806-49f2-98b5-4d17c47740c3	100	0	2026-06-19 14:40:26.523481+00
0e4a10aa-0bbe-43a9-a3bc-dff12a6ad4a3	e42bd84d-9bb9-473f-af7f-408d8dfbeb94	983	0	2026-06-19 16:48:00.997628+00
e8d837c9-1fb1-4c72-873d-11ccd57e9aa1	56f7f1d7-03d5-4234-a42d-fcdd523a325d	0	0	2026-06-19 14:39:40.681725+00
7fa0813c-b678-45b6-b56c-a90b2b4155fb	a56837f6-bcfb-48c4-8993-0d95418a3a14	35	0	2026-06-25 14:29:08.541243+00
b4c7ad56-822d-4aee-991d-0dcb5e38bf07	592479e8-e504-405f-8211-16b3d4499e67	60	0	2026-06-25 14:29:22.279999+00
60cccc0b-53ae-406f-96ec-b149fd2cc192	1a83b9c8-8b52-48ab-a3ba-f507dbf17ed6	8	0	2026-06-25 14:30:25.771586+00
86eefba2-88a2-4257-a09a-0e4325bc7d69	1c0d5a64-d877-459f-9a05-5ad77919d55d	98	0	2026-07-10 05:03:20.264142+00
73119880-1da1-44f8-a66c-c06255714a9e	6a1f91e0-4383-461b-b5eb-0fb35ad48981	39	0	2026-07-10 06:02:21.950628+00
05af8217-8e03-4c32-83eb-dfeedb480225	fbc5a854-9215-44ca-9e90-fca09e55b7f4	14	0	2026-07-10 13:22:24.533261+00
8ea81818-e985-40c5-bc41-6d1c154199e7	6630f120-1fea-406c-a25e-73394fec24e7	986	0	2026-07-10 13:22:24.533261+00
c2e3acdb-2f83-49dd-8c6a-6959e31ac5ad	694e2feb-f4ba-478f-b79f-7f44670dbf06	98	0	2026-07-10 13:41:09.643741+00
57a7ef81-c6a8-4ad7-b0e3-87eb5d1705dc	6edddb76-b21c-46ec-9cc7-8ca6209bb0e8	116	0	2026-07-10 14:55:26.458577+00
3181e9b9-2a54-41c9-851a-b0e1de52450b	82332865-aaa9-48f7-b199-26e69c4cca17	82	0	2026-07-10 15:08:40.879564+00
84c6e25a-1cf8-42ad-a1d8-01f51bb41b1d	08da099e-b304-4006-a9fd-af64b67abd0c	5426	0	2026-07-10 15:08:40.879564+00
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public.order_items (id, order_id, product_id, quantity, unit_price) FROM stdin;
f6d119d5-68dd-4ef2-b54e-7356a367b4b6	f726faea-a225-49b4-bd7c-5ce777993139	08da099e-b304-4006-a9fd-af64b67abd0c	2	4000.00
1780fe63-93af-4f7b-ba2d-b21e895fd75b	bfdb8861-0c7e-4f20-898b-b545907d56a0	e42bd84d-9bb9-473f-af7f-408d8dfbeb94	7	41000.00
dd7c0937-eee1-4142-a552-9dffc7b66067	1b894255-1361-486c-87ab-65e397af4c5e	6edddb76-b21c-46ec-9cc7-8ca6209bb0e8	1	599.00
f3c5f644-c73c-4a65-b1df-280922bfe572	1b894255-1361-486c-87ab-65e397af4c5e	1c0d5a64-d877-459f-9a05-5ad77919d55d	1	2400.00
8d84cdeb-8c60-49f2-b51e-63ae517d4054	45334b4f-cb50-4de4-a625-7433e6bced89	6edddb76-b21c-46ec-9cc7-8ca6209bb0e8	1	599.00
27d88396-64ea-431d-be7c-03fee92394a1	45334b4f-cb50-4de4-a625-7433e6bced89	1c0d5a64-d877-459f-9a05-5ad77919d55d	1	2400.00
dfe21dd1-b17b-442e-9a2c-de6d6314809c	6bcdeb4c-154d-4bb0-a38e-d05271f284d8	82332865-aaa9-48f7-b199-26e69c4cca17	1	1499.00
e7603ce0-8a84-4a27-b8e0-15618bd7f91e	98f11b18-7e1a-469f-b4af-55825be32b6b	6a1f91e0-4383-461b-b5eb-0fb35ad48981	1	3200.00
a2d14fdf-a88c-4eb2-93b7-e62392921e5d	acfbca70-d86f-4b0d-acda-790dbc11454b	08da099e-b304-4006-a9fd-af64b67abd0c	1	4000.00
58d67679-e78d-4870-9fa4-48748e71fc0f	305a25da-bb5b-489b-b1e9-050644ca5dfd	694e2feb-f4ba-478f-b79f-7f44670dbf06	1	10000.00
84d04304-6c06-4e67-83e6-a0f913165e69	305a25da-bb5b-489b-b1e9-050644ca5dfd	6edddb76-b21c-46ec-9cc7-8ca6209bb0e8	1	599.00
248e0f61-8b33-4421-b4b1-0e270f025f3c	943fb2bb-57bc-4f2e-ae5e-aad7cb0b145a	08da099e-b304-4006-a9fd-af64b67abd0c	1	4000.00
c6504a78-cb05-49b2-8e7e-2fe70dfd7b7c	40983a6f-e2a2-46ea-a801-33f2445fbb4a	6630f120-1fea-406c-a25e-73394fec24e7	1	50000.00
061b6904-f7f9-4012-b706-ccdd71e12fad	40983a6f-e2a2-46ea-a801-33f2445fbb4a	fbc5a854-9215-44ca-9e90-fca09e55b7f4	1	4500.00
0622588f-232f-4439-ac2e-18d849828540	793cc99e-744b-489c-886d-66a4bb13ecdc	08da099e-b304-4006-a9fd-af64b67abd0c	1	4000.00
8ea07664-77a1-444b-89f3-5949b5e88fe3	793cc99e-744b-489c-886d-66a4bb13ecdc	694e2feb-f4ba-478f-b79f-7f44670dbf06	1	10000.00
c5056a89-7efa-41dc-8bf9-c15dd5163087	793cc99e-744b-489c-886d-66a4bb13ecdc	82332865-aaa9-48f7-b199-26e69c4cca17	1	1499.00
39f682e5-0cd8-4dab-95c7-6112731f4f42	24f76ea8-b00d-481d-9bc2-ba5bdd8bd855	6edddb76-b21c-46ec-9cc7-8ca6209bb0e8	1	599.00
cddf782c-b18f-47f7-bdf9-c17eb93c9616	9e09dd2a-1921-40ca-9daa-90c2217263e7	08da099e-b304-4006-a9fd-af64b67abd0c	1	4000.00
4aa7ef7c-1847-4ae5-a3d7-2fd1bdbd6a59	9e09dd2a-1921-40ca-9daa-90c2217263e7	82332865-aaa9-48f7-b199-26e69c4cca17	1	1499.00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public.orders (id, user_id, total_amount, status, created_at) FROM stdin;
f726faea-a225-49b4-bd7c-5ce777993139	b1b2bf20-9f3c-4e31-b430-2a4e0c6f21db	8000.00	PENDING	2026-06-19 16:34:30.435392
bfdb8861-0c7e-4f20-898b-b545907d56a0	b1b2bf20-9f3c-4e31-b430-2a4e0c6f21db	287000.00	SHIPPED	2026-06-19 16:48:01.004186
1b894255-1361-486c-87ab-65e397af4c5e	af94a620-b1a0-4b40-8739-9c7522991b8b	2999.00	PENDING	2026-07-09 16:55:12.68033
45334b4f-cb50-4de4-a625-7433e6bced89	af94a620-b1a0-4b40-8739-9c7522991b8b	2999.00	PENDING	2026-07-10 05:03:20.362737
6bcdeb4c-154d-4bb0-a38e-d05271f284d8	af94a620-b1a0-4b40-8739-9c7522991b8b	1499.00	PENDING	2026-07-10 05:04:24.927368
98f11b18-7e1a-469f-b4af-55825be32b6b	af94a620-b1a0-4b40-8739-9c7522991b8b	3200.00	PENDING	2026-07-10 06:02:21.962446
acfbca70-d86f-4b0d-acda-790dbc11454b	af94a620-b1a0-4b40-8739-9c7522991b8b	4000.00	PENDING	2026-07-10 06:15:25.157511
305a25da-bb5b-489b-b1e9-050644ca5dfd	af94a620-b1a0-4b40-8739-9c7522991b8b	10599.00	PENDING	2026-07-10 12:39:40.143454
943fb2bb-57bc-4f2e-ae5e-aad7cb0b145a	af94a620-b1a0-4b40-8739-9c7522991b8b	4000.00	PENDING	2026-07-10 12:55:32.604715
40983a6f-e2a2-46ea-a801-33f2445fbb4a	a6af84d4-fa4d-4448-a54b-c3059366036a	54500.00	PENDING	2026-07-10 13:22:24.542042
793cc99e-744b-489c-886d-66a4bb13ecdc	a6af84d4-fa4d-4448-a54b-c3059366036a	15499.00	PENDING	2026-07-10 13:41:09.651053
24f76ea8-b00d-481d-9bc2-ba5bdd8bd855	a6af84d4-fa4d-4448-a54b-c3059366036a	599.00	PENDING	2026-07-10 14:55:26.464831
9e09dd2a-1921-40ca-9daa-90c2217263e7	a6af84d4-fa4d-4448-a54b-c3059366036a	5499.00	PENDING	2026-07-10 15:08:40.889181
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public.products (id, name, description, category, price, is_active, created_at, updated_at) FROM stdin;
6630f120-1fea-406c-a25e-73394fec24e7	Laptop 1	Sumsung Laptop	Electronics	50000.00	t	2026-06-18 09:28:31.889914+00	2026-06-18 09:28:31.889914+00
08da099e-b304-4006-a9fd-af64b67abd0c	Mobile 1	Sumsung Mobile 1	Electronics	4000.00	t	2026-06-18 09:29:03.792151+00	2026-06-18 09:29:03.792151+00
a2a49b2c-b5bd-410d-a9af-5dadc26ec1a0	Tab S9 17	Sumsung Tab 1	Electronics	3400.00	t	2026-06-18 09:29:31.566082+00	2026-06-18 09:31:16.50414+00
94a2245a-58be-4698-9551-85bc85270b91	Tab 17 denga	Sumsung Tab 1	Nondsss	5000.00	f	2026-06-18 09:32:08.252043+00	2026-06-18 09:33:57.421141+00
d1850b13-958b-422d-974f-017a23278beb	Sofa genious 3a	Sofa genious 3a	Furniture	15000.00	t	2026-06-19 14:37:59.463179+00	2026-06-19 14:37:59.463179+00
694e2feb-f4ba-478f-b79f-7f44670dbf06	Sofa genious 3s	Sofa genious 3 seaters	Furniture	10000.00	t	2026-06-19 14:38:29.699715+00	2026-06-19 14:38:29.699715+00
20417835-c806-49f2-98b5-4d17c47740c3	Laptop Professional a1	Intell	Electronics	37000.00	t	2026-06-19 14:40:26.523481+00	2026-06-19 14:43:11.484893+00
56f7f1d7-03d5-4234-a42d-fcdd523a325d	Laptop domestic	Dell s	Electronics	20000.00	f	2026-06-19 14:39:40.681725+00	2026-06-19 14:44:49.277388+00
e42bd84d-9bb9-473f-af7f-408d8dfbeb94	Ar1 Laptop Professional a1	Intell GFF	Electronics	41000.00	t	2026-06-19 16:45:43.126537+00	2026-06-19 16:45:43.126537+00
6edddb76-b21c-46ec-9cc7-8ca6209bb0e8	The Silent Horizon	Hardcover edition of the best-selling sci-fi thriller by Arthur Pendelton.	Books	599.00	t	2026-06-25 14:28:03.118285+00	2026-06-25 14:28:03.118285+00
82332865-aaa9-48f7-b199-26e69c4cca17	Mastering Python Syntax	Comprehensive paperback guide for intermediate programmers, includes online practice labs.	Books	1499.00	t	2026-06-25 14:28:24.262722+00	2026-06-25 14:28:24.262722+00
6a1f91e0-4383-461b-b5eb-0fb35ad48981	AeroWeave Running Jacket	Lightweight, water-resistant windbreaker with reflective strips for night running.	Clothing	3200.00	t	2026-06-25 14:28:40.172268+00	2026-06-25 14:28:40.172268+00
fbc5a854-9215-44ca-9e90-fca09e55b7f4	Classic Denim Jacket	100% organic cotton unisex denim jacket with a relaxed fit and vintage wash.	Clothing	4500.00	t	2026-06-25 14:28:54.226902+00	2026-06-25 14:28:54.226902+00
a56837f6-bcfb-48c4-8993-0d95418a3a14	Apex Grip Basketball	Official size 7 composite leather basketball designed for both indoor and outdoor courts.	Sports	2200.00	t	2026-06-25 14:29:08.541243+00	2026-06-25 14:29:08.541243+00
592479e8-e504-405f-8211-16b3d4499e67	FlexForm Yoga Mat	6mm eco-friendly non-slip TPE mat with alignment lines, includes carrying strap.	Sports	1800.00	t	2026-06-25 14:29:22.279999+00	2026-06-25 14:29:22.279999+00
1c0d5a64-d877-459f-9a05-5ad77919d55d	AromaMist Diffuser	500ml ultrasonic essential oil diffuser with 7-color ambient LED lights and auto-shutoff.	Home	2400.00	t	2026-06-25 14:29:35.983936+00	2026-06-25 14:29:35.983936+00
1a83b9c8-8b52-48ab-a3ba-f507dbf17ed6	ErgoComfort Office Chair	High-back mesh desk chair with adjustable lumbar support and 3D armrests.	Home	14500.00	t	2026-06-25 14:30:25.771586+00	2026-06-25 14:30:25.771586+00
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public.roles (id, name) FROM stdin;
6243bab6-12cb-41dd-b981-ddc083ecc007	ADMIN
ff7a5590-34d8-4574-81ff-3035d88443e1	CUSTOMER
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ecommerce_user
--

COPY public.users (id, email, password_hash, role_id) FROM stdin;
b1b2bf20-9f3c-4e31-b430-2a4e0c6f21db	customer-pune@solvexasol.com	$2b$12$9izYFFZM4rrpd4RmQe179u8OgWsGGgcjevtko9ag7Ogw0tfuIKgfm	ff7a5590-34d8-4574-81ff-3035d88443e1
a18ab770-8fd4-41bc-9b36-6a58dc909608	admin-pune@solvexasol.com	$2b$12$deAfJloh3gnoa5AHNmH5.eX7FYjFT1LuMe7hdxWuOE/IzfuZTX1DW	6243bab6-12cb-41dd-b981-ddc083ecc007
53d80375-fceb-4d87-8f6f-c4a578be1997	admin-pune1@solvexasol.com	$2b$12$81wU83WZ7moPFLv9ro75EemeZfhbFj0.PbuULkR5/CKcddWxymeZe	6243bab6-12cb-41dd-b981-ddc083ecc007
e03d0a66-3f4f-4fc4-80f9-47544a6f83a2	cvdf22@solvexasol.com	$2b$12$KKs/E01F6VrCTWp.w5Y8deAP2XJfTOL8tXfMzcv67fotWhOqQIEAi	ff7a5590-34d8-4574-81ff-3035d88443e1
6d943049-6ab5-469f-add1-4cbaf886d985	custpun1@solvexasol.com	$2b$12$A5EfDX/00Mkki3ydJThp9OP1ifwamZfgvUwnUbd11uj9woP9LWypK	ff7a5590-34d8-4574-81ff-3035d88443e1
fb736fe6-7ae2-4f5a-aa17-1eec467bb7f1	jul7626@solvexasol.com	$2b$12$fzv/n3bxEU71KiwF0.Uj.e9i1ppQcKs3Dp5rr8vrXkUJ1JJXDWr3G	ff7a5590-34d8-4574-81ff-3035d88443e1
af94a620-b1a0-4b40-8739-9c7522991b8b	jul762612@solvexasol.com	$2b$12$LLKT05Ia.4/FWYlrMvp9OOxwGy3uFNQKyqra9KUPInRsxs9ri/IhG	ff7a5590-34d8-4574-81ff-3035d88443e1
a6af84d4-fa4d-4448-a54b-c3059366036a	zahisaye@solvexasol.com	$2b$12$CuJJYILTe5qkPgVcXSZPfOh8NGcaaoEotDHU3GW3Sw.eRBcNWNc7G	ff7a5590-34d8-4574-81ff-3035d88443e1
dd62c1ff-fa79-405c-9d3f-324215f01fa8	test1@solvexasol.com	$2b$12$AOguiQIKL8jHCi.Noww0VOTYAc./VbhXWXXNTtSYEHmrJgKCs1G5q	ff7a5590-34d8-4574-81ff-3035d88443e1
c9b39a87-0e99-4a71-bef1-a80004c73a8f	test2@solvexasol.com	$2b$12$XWVYaeW6w4iMQzivaXrw5u1XOGtgyQe1XzSjU8ZwlXJBYI5rRnAKu	ff7a5590-34d8-4574-81ff-3035d88443e1
f9961f5a-7683-4532-9717-44d2c7cc6d21	den1@solvexasol.com	$2b$12$GHRsf6cW9H69QR4ezNEnCOitlnsF6rJfObD4QsU2kM9th5GdqBMLS	ff7a5590-34d8-4574-81ff-3035d88443e1
\.


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);


--
-- Name: inventory inventory_product_id_key; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_product_id_key UNIQUE (product_id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: ecommerce_user
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: inventory inventory_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ecommerce_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

\unrestrict GyhJAjBsSlbVNOpYlMEhbggh0TbAlHr04bVVb2oEfYXxc0U3ITTY7iJnpbfVCyD

