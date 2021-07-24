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
VALUES ('alice1', 'alice_monte@gmail.com', 'password'),
('kira46', 'kira_tang@hotmail.com', 'password'),
('mike81', 'mike_lombard@yahoo.com', 'password'),
('bwhoolehan0', 'dhruska0@github.com', 'password'),
('dgadsby1', 'sbourthouloume1@nba.com', 'password'),
('vwedderburn2', 'mounsworth2@craigslist.org', 'DvETdhm9'),
('dchilles3', 'khughson3@netvibes.com', '81QudB'),
('sodhams4', 'rhuyge4@pinterest.com', '4LeBwNg1VW'),
('bladon5', 'wduckworth5@dropbox.com', 'v8ShFCGGcwHh'),
('mgummary6', 'pmonroe6@woothemes.com', 'I5tHF49NC7'),
('cmacenelly7', 'pllop7@canalblog.com', 'EC1rFDD7pT'),
('rfaas8', 'nspaice8@exblog.jp', 'Ef4yPzk6c'),
('balhirsi9', 'hguslon9@google.com', 'lXr3iLvpW'),
 ('ggarahana', 'cjohnstona@ibm.com', 'sgOnMrEUce'),
('wrepperb', 'smulberryb@cpanel.net', 'OXZjhxP0WsR'),
('bpitrolloc', 'lupcraftc@icio.us', 'QZXA9Z1rN'),
 ('cmarlend', 'cbarnwilld@fotki.com', 'A4ZgnhGE'),
 ('wkohtere', 'bairdriee@geocities.com', 'X4NK08BE6U'),
 ('ajayesf', 'kciraldof@4shared.com', 'Io989i'),
 ('ehovelg', 'eguierreg@alibaba.com', 'tiwZm3'),
 ('rvaughamh', 'mobrollachainh@purevolume.com', '7KYK17emloA'),
 ('blimpertzi', 'mluxtoni@cnbc.com', 'ppyGl32PQn2'),
 ('dgalletyj', 'fgilsthorpej@mozilla.com', '186MqyAh'),
 ('ssictornesk', 'nlendenk@rambler.ru', 'NQPVpE51'),
 ('etiesmanl', 'fclerel@adobe.com', 'lcgkqR32'),
 ('rfarlhamm', 'smoquinm@house.gov', 'MQvBJISB'),
 ('cbramern', 'nspillingn@stumbleupon.com', 'QWU3Pkm'),
 ('nboullino', 'cscanlano@gov.uk', 'LBCJGmGk'),
 ('tlowellp', 'tphairp@google.pl', 'o28SkMwLhtt1'),
 ('hleaheyq', 'ljesticoq@g.co', 'WEfHjnSkI'),
 ('dsunderlandr', 'lbrixeyr@nydailynews.com', 'IjxYpUgrDq'),
 ('msustins', 'dmapledorums@google.de', 'nhd8ZjVk6w'),
 ('tlovet', 'bthreadgoldt@kickstarter.com', 'jq2ttZb');

