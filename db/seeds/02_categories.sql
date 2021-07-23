/*
categories (
id: serial
title: varchar
description: text
created_at: timestamptz
updated_at: timestamptz
creator_id: user.id
*/

INSERT INTO categories (title, description) 
VALUES ('nature', 'Resources relating to nature.'),
('animals', 'Resources relating to animals.'),
('sports', 'Resources relating to sports.');