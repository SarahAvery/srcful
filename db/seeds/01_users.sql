-- Users table seeds here (Example)
/*
  users (
  id uuid DEFAULT uuid_generate_v1() PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
*/


INSERT INTO users (username, email, password)
VALUES ('alice1', 'alice_monte@gmail.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('kira46', 'kira_tang@hotmail.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('mike81', 'mike_lombard@yahoo.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('bwhoolehan0', 'dhruska0@github.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('dgadsby1', 'sbourthouloume1@nba.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('vwedderburn2', 'mounsworth2@craigslist.org', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('dchilles3', 'khughson3@netvibes.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('sodhams4', 'rhuyge4@pinterest.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('bladon5', 'wduckworth5@dropbox.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('mgummary6', 'pmonroe6@woothemes.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('cmacenelly7', 'pllop7@canalblog.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('rfaas8', 'nspaice8@exblog.jp', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('balhirsi9', 'hguslon9@google.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('ggarahana', 'cjohnstona@ibm.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('wrepperb', 'smulberryb@cpanel.net', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('bpitrolloc', 'lupcraftc@icio.us', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('cmarlend', 'cbarnwilld@fotki.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('wkohtere', 'bairdriee@geocities.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('ajayesf', 'kciraldof@4shared.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('ehovelg', 'eguierreg@alibaba.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('rvaughamh', 'mobrollachainh@purevolume.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('blimpertzi', 'mluxtoni@cnbc.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('dgalletyj', 'fgilsthorpej@mozilla.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('ssictornesk', 'nlendenk@rambler.ru', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('etiesmanl', 'fclerel@adobe.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('rfarlhamm', 'smoquinm@house.gov', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('cbramern', 'nspillingn@stumbleupon.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('nboullino', 'cscanlano@gov.uk', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('tlowellp', 'tphairp@google.pl', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('hleaheyq', 'ljesticoq@g.co', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('dsunderlandr', 'lbrixeyr@nydailynews.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('msustins', 'dmapledorums@google.de', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
 ('tlovet', 'bthreadgoldt@kickstarter.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO');
