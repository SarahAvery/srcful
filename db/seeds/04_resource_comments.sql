/*
resource_comments (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
)
*/

-- 1 - 33 user id's
-- 1 - 33 res_id

INSERT INTO resource_comments (title, content, user_id, resource_id) 
VALUES ('Great resource', 'This resource was really helpful.', 1, 1),
('Okay resource', 'This resource could be better.', 2, 2),
('Bad resource', 'This resource was not helpful.', 3, 2),
('sed magna at nunc commodo placerat praesent', 'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.', 27, 25),
('cubilia curae duis faucibus accumsan', 'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.', 25, 18),
('elit ac nulla sed', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet.', 12, 18),
('amet turpis elementum ligula vehicula', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 3, 14),
('elit ac nulla', 'Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.', 11, 13),
('sapien non mi integer ac neque', 'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 6, 31),
('nisl venenatis lacinia', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 12, 7),
('sapien non mi', 'Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.', 16, 26),
('massa tempor convallis nulla', 'Etiam justo.', 5, 10),
('quis tortor id nulla', 'Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 22, 26),
('ullamcorper purus sit amet nulla quisque arcu', 'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.', 3, 31),
('duis consequat dui nec nisi volutpat eleifend', 'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.', 17, 33),
('urna pretium nisl ut', 'Nullam varius.', 32, 2),
('eget vulputate ut ultrices vel', 'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.', 8, 22),
('erat nulla tempus vivamus in felis eu', 'Cras non velit nec nisi vulputate nonummy.', 23, 11),
('ligula nec sem', 'Cras non velit nec nisi vulputate nonummy.', 11, 19),
('felis fusce posuere felis sed', 'Nullam sit amet turpis elementum ligula vehicula consequat.', 7, 13),
('elementum pellentesque quisque porta volutpat', 'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.', 17, 18),
('sit amet eros suspendisse accumsan tortor quis', 'Suspendisse potenti. In eleifend quam a odio.', 24, 14),
('phasellus sit amet erat nulla', 'Nulla tellus. In sagittis dui vel nisl. Duis ac nibh.', 5, 28),
('bibendum felis sed interdum venenatis turpis', 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.', 16, 2),
('vitae ipsum aliquam non mauris morbi non', 'Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.', 33, 29),
('lectus pellentesque at nulla suspendisse potenti', 'Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.', 20, 1),
('maecenas tristique est et tempus', 'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.', 29, 16),
('in consequat ut nulla sed', 'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 8, 32),
('sapien dignissim vestibulum', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 28, 13),
('aliquet at feugiat non pretium', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 21, 3),
('vulputate ut ultrices vel augue', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 24, 25),
('penatibus et magnis dis parturient montes', 'Sed ante. Vivamus tortor.', 27, 5),
('mi in porttitor pede justo eu', 'Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.', 20, 18);