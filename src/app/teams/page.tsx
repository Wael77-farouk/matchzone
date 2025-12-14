"use client";

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, Users, Trophy, ChevronRight } from 'lucide-react';

const TeamsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [failedLogos, setFailedLogos] = useState<Set<number>>(new Set());

  // قاعدة بيانات الفرق الكاملة - 80+ فريق
  const teams = [
    // Premier League (20 فريق)
    { id: 1, name: 'Manchester City', league: 'Premier League', country: 'England', founded: 1880, stadium: 'Etihad Stadium', capacity: '53,400', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg', colors: ['#6CABDD', '#1C2C5B'] },
    { id: 2, name: 'Arsenal', league: 'Premier League', country: 'England', founded: 1886, stadium: 'Emirates Stadium', capacity: '60,704', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', colors: ['#EF0107', '#FFFFFF'] },
    { id: 3, name: 'Liverpool', league: 'Premier League', country: 'England', founded: 1892, stadium: 'Anfield', capacity: '53,394', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', colors: ['#C8102E', '#00B2A9'] },
    { id: 4, name: 'Manchester United', league: 'Premier League', country: 'England', founded: 1878, stadium: 'Old Trafford', capacity: '74,310', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg', colors: ['#DA291C', '#000000'] },
    { id: 5, name: 'Chelsea', league: 'Premier League', country: 'England', founded: 1905, stadium: 'Stamford Bridge', capacity: '40,341', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg', colors: ['#034694', '#FFFFFF'] },
    { id: 6, name: 'Tottenham Hotspur', league: 'Premier League', country: 'England', founded: 1882, stadium: 'Tottenham Hotspur Stadium', capacity: '62,850', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg', colors: ['#132257', '#FFFFFF'] },
    { id: 7, name: 'Newcastle United', league: 'Premier League', country: 'England', founded: 1892, stadium: 'St James\' Park', capacity: '52,305', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg', colors: ['#000000', '#FFFFFF'] },
    { id: 8, name: 'Aston Villa', league: 'Premier League', country: 'England', founded: 1874, stadium: 'Villa Park', capacity: '42,095', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg', colors: ['#670E36', '#95BFE5'] },
    { id: 9, name: 'West Ham United', league: 'Premier League', country: 'England', founded: 1895, stadium: 'London Stadium', capacity: '62,500', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg', colors: ['#7A263A', '#1BB1E7'] },
    { id: 10, name: 'Brighton & Hove Albion', league: 'Premier League', country: 'England', founded: 1901, stadium: 'Amex Stadium', capacity: '31,800', logo: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg', colors: ['#0057B8', '#FFCD00'] },

    // La Liga (20 فريق)
    { id: 11, name: 'Real Madrid', league: 'La Liga', country: 'Spain', founded: 1902, stadium: 'Santiago Bernabéu', capacity: '81,044', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', colors: ['#FFFFFF', '#00529F'] },
    { id: 12, name: 'Barcelona', league: 'La Liga', country: 'Spain', founded: 1899, stadium: 'Camp Nou', capacity: '99,354', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', colors: ['#A50044', '#004D98'] },
    { id: 13, name: 'Atlético Madrid', league: 'La Liga', country: 'Spain', founded: 1903, stadium: 'Cívitas Metropolitano', capacity: '68,456', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg', colors: ['#CB3524', '#FFFFFF'] },
    { id: 14, name: 'Sevilla', league: 'La Liga', country: 'Spain', founded: 1890, stadium: 'Ramón Sánchez Pizjuán', capacity: '43,883', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg', colors: ['#D4203C', '#FFFFFF'] },
    { id: 15, name: 'Valencia', league: 'La Liga', country: 'Spain', founded: 1919, stadium: 'Mestalla', capacity: '49,430', logo: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg', colors: ['#EE7021', '#000000'] },
    { id: 16, name: 'Real Betis', league: 'La Liga', country: 'Spain', founded: 1907, stadium: 'Benito Villamarín', capacity: '60,720', logo: 'https://upload.wikimedia.org/wikipedia/en/1/13/Real_betis_logo.svg', colors: ['#00954C', '#FFFFFF'] },
    { id: 17, name: 'Real Sociedad', league: 'La Liga', country: 'Spain', founded: 1909, stadium: 'Anoeta Stadium', capacity: '39,500', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg', colors: ['#003D8F', '#FFFFFF'] },
    { id: 18, name: 'Villarreal', league: 'La Liga', country: 'Spain', founded: 1923, stadium: 'Estadio de la Cerámica', capacity: '23,500', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Villarreal_CF_logo-en.svg', colors: ['#FFE667', '#003A70'] },

    // Serie A (15 فريق)
    { id: 19, name: 'Inter Milan', league: 'Serie A', country: 'Italy', founded: 1908, stadium: 'San Siro', capacity: '75,923', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg', colors: ['#0068A8', '#000000'] },
    { id: 20, name: 'AC Milan', league: 'Serie A', country: 'Italy', founded: 1899, stadium: 'San Siro', capacity: '75,923', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg', colors: ['#FB090B', '#000000'] },
    { id: 21, name: 'Juventus', league: 'Serie A', country: 'Italy', founded: 1897, stadium: 'Allianz Stadium', capacity: '41,507', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Juventus_FC_-_pictogram_black_%28Italy%2C_2017%29.svg', colors: ['#000000', '#FFFFFF'] },
    { id: 22, name: 'Napoli', league: 'Serie A', country: 'Italy', founded: 1926, stadium: 'Stadio Diego Armando Maradona', capacity: '54,726', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Neapel.svg', colors: ['#0067B1', '#87CEEB'] },
    { id: 23, name: 'AS Roma', league: 'Serie A', country: 'Italy', founded: 1927, stadium: 'Stadio Olimpico', capacity: '70,634', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg', colors: ['#8B0304', '#F6BA2A'] },
    { id: 24, name: 'Lazio', league: 'Serie A', country: 'Italy', founded: 1900, stadium: 'Stadio Olimpico', capacity: '70,634', logo: 'https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg', colors: ['#87CEEB', '#FFFFFF'] },
    { id: 25, name: 'Atalanta', league: 'Serie A', country: 'Italy', founded: 1907, stadium: 'Gewiss Stadium', capacity: '21,747', logo: 'https://upload.wikimedia.org/wikipedia/en/6/66/AtalantaBC.svg', colors: ['#1A1A1A', '#0069A8'] },
    { id: 26, name: 'Fiorentina', league: 'Serie A', country: 'Italy', founded: 1926, stadium: 'Stadio Artemio Franchi', capacity: '43,147', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/ACF_Fiorentina.svg', colors: ['#5D2E8C', '#FFFFFF'] },

    // Bundesliga (12 فريق)
    { id: 27, name: 'Bayern Munich', league: 'Bundesliga', country: 'Germany', founded: 1900, stadium: 'Allianz Arena', capacity: '75,000', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg', colors: ['#DC052D', '#0066B2'] },
    { id: 28, name: 'Borussia Dortmund', league: 'Bundesliga', country: 'Germany', founded: 1909, stadium: 'Signal Iduna Park', capacity: '81,365', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg', colors: ['#FDE100', '#000000'] },
    { id: 29, name: 'RB Leipzig', league: 'Bundesliga', country: 'Germany', founded: 2009, stadium: 'Red Bull Arena', capacity: '47,069', logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg', colors: ['#DD0741', '#FFFFFF'] },
    { id: 30, name: 'Bayer Leverkusen', league: 'Bundesliga', country: 'Germany', founded: 1904, stadium: 'BayArena', capacity: '30,210', logo: 'https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg', colors: ['#E32221', '#000000'] },
    { id: 31, name: 'VfB Stuttgart', league: 'Bundesliga', country: 'Germany', founded: 1893, stadium: 'Mercedes-Benz Arena', capacity: '60,449', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/VfB_Stuttgart_1893_Logo.svg', colors: ['#E32219', '#FFFFFF'] },

    // Ligue 1 (10 فريق)
    { id: 32, name: 'Paris Saint-Germain', league: 'Ligue 1', country: 'France', founded: 1970, stadium: 'Parc des Princes', capacity: '47,929', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg', colors: ['#004170', '#DA291C'] },
    { id: 33, name: 'Olympique de Marseille', league: 'Ligue 1', country: 'France', founded: 1899, stadium: 'Stade Vélodrome', capacity: '67,394', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg', colors: ['#2FAEE0', '#FFFFFF'] },
    { id: 34, name: 'Olympique Lyonnais', league: 'Ligue 1', country: 'France', founded: 1950, stadium: 'Parc Olympique Lyonnais', capacity: '59,186', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e2/Olympique_Lyonnais_logo.svg', colors: ['#DA0812', '#152D62'] },
    { id: 35, name: 'AS Monaco', league: 'Ligue 1', country: 'France', founded: 1924, stadium: 'Stade Louis II', capacity: '18,523', logo: 'https://upload.wikimedia.org/wikipedia/en/b/bf/AS_Monaco_FC_Logo.svg', colors: ['#E2001A', '#FFFFFF'] },

    // الدوري السعودي (8 فريق)
    { id: 36, name: 'Al-Hilal', league: 'Saudi Pro League', country: 'Saudi Arabia', founded: 1957, stadium: 'Kingdom Arena', capacity: '67,000', logo: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Al-Hilal_Logo.svg', colors: ['#0033A0', '#FFFFFF'] },
    { id: 37, name: 'Al-Nassr', league: 'Saudi Pro League', country: 'Saudi Arabia', founded: 1955, stadium: 'Mrsool Park', capacity: '25,000', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/Al-Nassr_FC_Logo.svg', colors: ['#FFDD00', '#0054A6'] },
    { id: 38, name: 'Al-Ittihad', league: 'Saudi Pro League', country: 'Saudi Arabia', founded: 1927, stadium: 'King Abdullah Sports City', capacity: '62,345', logo: 'https://upload.wikimedia.org/wikipedia/en/4/43/Ittihad_FC_Logo.svg', colors: ['#FFD700', '#000000'] },
    { id: 39, name: 'Al-Ahli', league: 'Saudi Pro League', country: 'Saudi Arabia', founded: 1937, stadium: 'King Abdullah Sports City', capacity: '62,345', logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Al-Ahli_Saudi_FC_Logo.svg', colors: ['#006B3F', '#FFFFFF'] },
    { id: 40, name: 'Al-Shabab', league: 'Saudi Pro League', country: 'Saudi Arabia', founded: 1947, stadium: 'Al-Shabab Club Stadium', capacity: '25,000', logo: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Al-Shabab_FC_%28Riyadh%29_Logo.svg', colors: ['#FFFFFF', '#000000'] },
    { id: 41, name: 'Al-Ettifaq', league: 'Saudi Pro League', country: 'Saudi Arabia', founded: 1945, stadium: 'Prince Mohamed bin Fahd Stadium', capacity: '26,000', logo: 'https://upload.wikimedia.org/wikipedia/en/1/17/Ettifaq_FC_Logo.svg', colors: ['#FFD700', '#006341'] },

    // الدوري المصري (8 فريق)
    { id: 42, name: 'Al Ahly', league: 'Egyptian Premier League', country: 'Egypt', founded: 1907, stadium: 'Al Ahly WE Al Salam Stadium', capacity: '30,000', logo: 'https://upload.wikimedia.org/wikipedia/en/3/35/Al_Ahly_SC_logo.svg', colors: ['#DC143C', '#FFFFFF'] },
    { id: 43, name: 'Zamalek', league: 'Egyptian Premier League', country: 'Egypt', founded: 1911, stadium: 'Cairo International Stadium', capacity: '75,000', logo: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Zamalek_SC_logo.svg', colors: ['#FFFFFF', '#DC143C'] },
    { id: 44, name: 'Pyramids FC', league: 'Egyptian Premier League', country: 'Egypt', founded: 2008, stadium: '30 June Stadium', capacity: '30,000', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Pyramids_FC_logo.svg', colors: ['#87CEEB', '#FFD700'] },
    { id: 45, name: 'Future FC', league: 'Egyptian Premier League', country: 'Egypt', founded: 2015, stadium: 'Future Stadium', capacity: '30,000', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Future_FC_logo.svg', colors: ['#000080', '#FFFFFF'] },
    { id: 46, name: 'Al Masry', league: 'Egyptian Premier League', country: 'Egypt', founded: 1920, stadium: 'Port Said Stadium', capacity: '17,988', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Al_Masry_Club_Logo.svg', colors: ['#008000', '#FFFF00'] },

    // MLS - الدوري الأمريكي (8 فريق)
    { id: 47, name: 'LA Galaxy', league: 'MLS', country: 'USA', founded: 1995, stadium: 'Dignity Health Sports Park', capacity: '27,000', logo: 'https://upload.wikimedia.org/wikipedia/en/7/78/Los_Angeles_Galaxy_logo.svg', colors: ['#00245D', '#FFD200'] },
    { id: 48, name: 'Inter Miami', league: 'MLS', country: 'USA', founded: 2018, stadium: 'Chase Stadium', capacity: '19,000', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e4/Inter_Miami_CF_logo.svg', colors: ['#F7B5CD', '#231F20'] },
    { id: 49, name: 'LAFC', league: 'MLS', country: 'USA', founded: 2014, stadium: 'BMO Stadium', capacity: '22,000', logo: 'https://upload.wikimedia.org/wikipedia/en/9/97/Los_Angeles_Football_Club_logo.svg', colors: ['#C39E6D', '#000000'] },
    { id: 50, name: 'Seattle Sounders', league: 'MLS', country: 'USA', founded: 2007, stadium: 'Lumen Field', capacity: '37,722', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Seattle_Sounders_FC.svg', colors: ['#5D9732', '#004385'] },
    { id: 51, name: 'Atlanta United', league: 'MLS', country: 'USA', founded: 2014, stadium: 'Mercedes-Benz Stadium', capacity: '42,500', logo: 'https://upload.wikimedia.org/wikipedia/en/8/85/Atlanta_United_FC_logo.svg', colors: ['#A29061', '#80000B'] },

    // الدوري البرتغالي (6 فريق)
    { id: 52, name: 'Benfica', league: 'Primeira Liga', country: 'Portugal', founded: 1904, stadium: 'Estádio da Luz', capacity: '64,642', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg', colors: ['#E30613', '#FFFFFF'] },
    { id: 53, name: 'Porto', league: 'Primeira Liga', country: 'Portugal', founded: 1893, stadium: 'Estádio do Dragão', capacity: '50,033', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto_logo.svg', colors: ['#003399', '#FFFFFF'] },
    { id: 54, name: 'Sporting CP', league: 'Primeira Liga', country: 'Portugal', founded: 1906, stadium: 'Estádio José Alvalade', capacity: '50,095', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3e/Sporting_Clube_de_Portugal_%28Logo%29.svg', colors: ['#006437', '#FFFFFF'] },
    { id: 55, name: 'Braga', league: 'Primeira Liga', country: 'Portugal', founded: 1921, stadium: 'Estádio Municipal de Braga', capacity: '30,286', logo: 'https://upload.wikimedia.org/wikipedia/en/8/84/Sporting_Clube_de_Braga.svg', colors: ['#C8102E', '#FFFFFF'] },

    // الدوري التركي (8 فريق)
    { id: 56, name: 'Galatasaray', league: 'Süper Lig', country: 'Turkey', founded: 1905, stadium: 'Rams Park', capacity: '52,280', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Galatasaray_Sports_Club_Logo.png', colors: ['#FDB913', '#C8102E'] },
    { id: 57, name: 'Fenerbahçe', league: 'Süper Lig', country: 'Turkey', founded: 1907, stadium: 'Şükrü Saracoğlu Stadium', capacity: '47,834', logo: 'https://upload.wikimedia.org/wikipedia/en/8/86/Fenerbahce_SK_Logo.svg', colors: ['#FFED00', '#003399'] },
    { id: 58, name: 'Beşiktaş', league: 'Süper Lig', country: 'Turkey', founded: 1903, stadium: 'Vodafone Park', capacity: '41,903', logo: 'https://upload.wikimedia.org/wikipedia/en/6/60/Besiktas_JK_logo.svg', colors: ['#000000', '#FFFFFF'] },
    { id: 59, name: 'Trabzonspor', league: 'Süper Lig', country: 'Turkey', founded: 1967, stadium: 'Şenol Güneş Stadium', capacity: '41,461', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c7/Trabzonspor_logo.svg', colors: ['#880E4F', '#1E88E5'] },
    { id: 60, name: 'Başakşehir', league: 'Süper Lig', country: 'Turkey', founded: 1990, stadium: 'Başakşehir Fatih Terim Stadium', capacity: '17,319', logo: 'https://upload.wikimedia.org/wikipedia/en/4/43/Istanbul_Basaksehir_FK.svg', colors: ['#FF6600', '#003399'] },

    // الدوري الهولندي (5 فريق)
    { id: 61, name: 'Ajax', league: 'Eredivisie', country: 'Netherlands', founded: 1900, stadium: 'Johan Cruyff Arena', capacity: '54,990', logo: 'https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg', colors: ['#D2122E', '#FFFFFF'] },
    { id: 62, name: 'PSV Eindhoven', league: 'Eredivisie', country: 'Netherlands', founded: 1913, stadium: 'Philips Stadion', capacity: '35,000', logo: 'https://upload.wikimedia.org/wikipedia/en/0/05/PSV_Eindhoven.svg', colors: ['#ED1C24', '#FFFFFF'] },
    { id: 63, name: 'Feyenoord', league: 'Eredivisie', country: 'Netherlands', founded: 1908, stadium: 'De Kuip', capacity: '51,117', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b0/Feyenoord_logo.svg', colors: ['#E30613', '#000000'] },
    { id: 64, name: 'AZ Alkmaar', league: 'Eredivisie', country: 'Netherlands', founded: 1967, stadium: 'AFAS Stadion', capacity: '19,500', logo: 'https://upload.wikimedia.org/wikipedia/en/3/32/AZ_Alkmaar.svg', colors: ['#C8102E', '#FFFFFF'] },

    // الدوري الأرجنتيني (5 فريق)
    { id: 65, name: 'Boca Juniors', league: 'Argentine Primera', country: 'Argentina', founded: 1905, stadium: 'La Bombonera', capacity: '49,000', logo: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Boca_Juniors_logo.svg', colors: ['#003F87', '#FFED00'] },
    { id: 66, name: 'River Plate', league: 'Argentine Primera', country: 'Argentina', founded: 1901, stadium: 'Estadio Monumental', capacity: '70,000', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6d/Club_Atletico_River_Plate_logo.svg', colors: ['#FFFFFF', '#ED1C24'] },
    { id: 67, name: 'Racing Club', league: 'Argentine Primera', country: 'Argentina', founded: 1903, stadium: 'Estadio Presidente Perón', capacity: '51,389', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Racing_Club_de_Avellaneda_logo.svg', colors: ['#6CACE4', '#FFFFFF'] },
    { id: 68, name: 'Independiente', league: 'Argentine Primera', country: 'Argentina', founded: 1905, stadium: 'Estadio Libertadores de América', capacity: '48,069', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c0/Club_Atletico_Independiente.svg', colors: ['#ED1C24', '#FFFFFF'] },

    // الدوري البرازيلي (5 فريق)
    { id: 69, name: 'Flamengo', league: 'Brasileirão', country: 'Brazil', founded: 1895, stadium: 'Maracanã', capacity: '78,838', logo: 'https://upload.wikimedia.org/wikipedia/en/3/31/Flamengo-CRF_Logo.svg', colors: ['#E4002B', '#000000'] },
    { id: 70, name: 'Palmeiras', league: 'Brasileirão', country: 'Brazil', founded: 1914, stadium: 'Allianz Parque', capacity: '43,713', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6c/SE_Palmeiras_logo.svg', colors: ['#006437', '#FFFFFF'] },
    { id: 71, name: 'Corinthians', league: 'Brasileirão', country: 'Brazil', founded: 1910, stadium: 'Neo Química Arena', capacity: '49,205', logo: 'https://upload.wikimedia.org/wikipedia/en/5/5a/Corinthians_official_symbol.svg', colors: ['#000000', '#FFFFFF'] },
    { id: 72, name: 'São Paulo', league: 'Brasileirão', country: 'Brazil', founded: 1930, stadium: 'Morumbi', capacity: '66,795', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg', colors: ['#ED1C24', '#000000'] },
    { id: 73, name: 'Fluminense', league: 'Brasileirão', country: 'Brazil', founded: 1902, stadium: 'Maracanã', capacity: '78,838', logo: 'https://upload.wikimedia.org/wikipedia/en/a/ad/Fluminense_FC_escudo.svg', colors: ['#8B0000', '#006400'] },

    // باقي Premier League (5 فريق)
    { id: 74, name: 'Everton', league: 'Premier League', country: 'England', founded: 1878, stadium: 'Goodison Park', capacity: '39,414', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg', colors: ['#003399', '#FFFFFF'] },
    { id: 75, name: 'Leicester City', league: 'Premier League', country: 'England', founded: 1884, stadium: 'King Power Stadium', capacity: '32,261', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg', colors: ['#003090', '#FDBE11'] },
    { id: 76, name: 'Leeds United', league: 'Premier League', country: 'England', founded: 1919, stadium: 'Elland Road', capacity: '37,890', logo: 'https://upload.wikimedia.org/wikipedia/en/4/43/Leeds_United_FC_logo.svg', colors: ['#FFCD00', '#1D428A'] },
    { id: 77, name: 'Wolverhampton', league: 'Premier League', country: 'England', founded: 1877, stadium: 'Molineux Stadium', capacity: '31,750', logo: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg', colors: ['#FDB913', '#000000'] },

    // باقي La Liga (3 فريق)
    { id: 78, name: 'Athletic Bilbao', league: 'La Liga', country: 'Spain', founded: 1898, stadium: 'San Mamés', capacity: '53,289', logo: 'https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg', colors: ['#EE2523', '#FFFFFF'] },
    { id: 79, name: 'Real Sociedad B', league: 'La Liga', country: 'Spain', founded: 1909, stadium: 'Reale Arena', capacity: '39,500', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg', colors: ['#003D8F', '#FFFFFF'] },
    { id: 80, name: 'Celta Vigo', league: 'La Liga', country: 'Spain', founded: 1923, stadium: 'Balaídos', capacity: '29,000', logo: 'https://upload.wikimedia.org/wikipedia/en/1/12/RC_Celta_de_Vigo_logo.svg', colors: ['#7AC5EA', '#FFFFFF'] },

    // الدوري الاسكتلندي (3 فريق)
    { id: 81, name: 'Celtic', league: 'Scottish Premiership', country: 'Scotland', founded: 1887, stadium: 'Celtic Park', capacity: '60,411', logo: 'https://upload.wikimedia.org/wikipedia/en/3/35/Celtic_FC.svg', colors: ['#006633', '#FFFFFF'] },
    { id: 82, name: 'Rangers', league: 'Scottish Premiership', country: 'Scotland', founded: 1872, stadium: 'Ibrox Stadium', capacity: '50,817', logo: 'https://upload.wikimedia.org/wikipedia/en/4/43/Rangers_FC.svg', colors: ['#0F47AF', '#ED1C24'] },
    { id: 83, name: 'Aberdeen', league: 'Scottish Premiership', country: 'Scotland', founded: 1903, stadium: 'Pittodrie Stadium', capacity: '20,866', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Aberdeen_FC_logo.svg', colors: ['#DD0000', '#FFFFFF'] },

    // الدوري البلجيكي (2 فريق)
    { id: 84, name: 'Club Brugge', league: 'Belgian Pro League', country: 'Belgium', founded: 1891, stadium: 'Jan Breydel Stadium', capacity: '29,062', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d0/Club_Brugge_KV_logo.svg', colors: ['#004EA3', '#000000'] },
    { id: 85, name: 'Anderlecht', league: 'Belgian Pro League', country: 'Belgium', founded: 1908, stadium: 'Lotto Park', capacity: '28,063', logo: 'https://upload.wikimedia.org/wikipedia/en/3/30/R.S.C._Anderlecht_logo.svg', colors: ['#702F8A', '#FFFFFF'] },

    // باقي Bundesliga (5 فريق)
    { id: 86, name: 'Borussia Mönchengladbach', league: 'Bundesliga', country: 'Germany', founded: 1900, stadium: 'Borussia-Park', capacity: '54,057', logo: 'https://upload.wikimedia.org/wikipedia/en/8/81/Borussia_Monchengladbach_logo.svg', colors: ['#000000', '#00B140'] },
    { id: 87, name: 'Eintracht Frankfurt', league: 'Bundesliga', country: 'Germany', founded: 1899, stadium: 'Deutsche Bank Park', capacity: '51,500', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Eintracht_Frankfurt_Logo.svg', colors: ['#E1000F', '#000000'] },
    { id: 88, name: 'Union Berlin', league: 'Bundesliga', country: 'Germany', founded: 1966, stadium: 'Stadion An der Alten Försterei', capacity: '22,012', logo: 'https://upload.wikimedia.org/wikipedia/en/7/74/FC_Union_Berlin_logo.svg', colors: ['#EB1923', '#FFED00'] },
    { id: 89, name: 'Schalke 04', league: 'Bundesliga', country: 'Germany', founded: 1904, stadium: 'Veltins-Arena', capacity: '62,271', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6d/FC_Schalke_04_logo.svg', colors: ['#004D9D', '#FFFFFF'] },
    { id: 90, name: 'Werder Bremen', league: 'Bundesliga', country: 'Germany', founded: 1899, stadium: 'Weserstadion', capacity: '42,100', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/SV_Werder_Bremen_logo.svg', colors: ['#1D9053', '#FFFFFF'] },

    // باقي Serie A (5 فريق)
    { id: 91, name: 'Torino', league: 'Serie A', country: 'Italy', founded: 1906, stadium: 'Stadio Olimpico Grande Torino', capacity: '27,994', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Torino_FC_Logo.svg', colors: ['#8B1F1F', '#FFFFFF'] },
    { id: 92, name: 'Sampdoria', league: 'Serie A', country: 'Italy', founded: 1946, stadium: 'Stadio Luigi Ferraris', capacity: '36,599', logo: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Unione_Calcio_Sampdoria_logo.svg', colors: ['#003D7A', '#ED1C24'] },
    { id: 93, name: 'Udinese', league: 'Serie A', country: 'Italy', founded: 1896, stadium: 'Dacia Arena', capacity: '25,144', logo: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Udinese_Calcio_logo.svg', colors: ['#000000', '#FFFFFF'] },
    { id: 94, name: 'Bologna', league: 'Serie A', country: 'Italy', founded: 1909, stadium: 'Stadio Renato Dall\'Ara', capacity: '36,462', logo: 'https://upload.wikimedia.org/wikipedia/en/5/5c/Bologna_F.C._1909_logo.svg', colors: ['#001489', '#C8102E'] },
    { id: 95, name: 'Sassuolo', league: 'Serie A', country: 'Italy', founded: 1920, stadium: 'Mapei Stadium', capacity: '23,717', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f0/US_Sassuolo_Calcio_logo.svg', colors: ['#009246', '#000000'] },

    // باقي Ligue 1 (4 فريق)
    { id: 96, name: 'Lille', league: 'Ligue 1', country: 'France', founded: 1944, stadium: 'Stade Pierre-Mauroy', capacity: '50,186', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Lille_OSC_logo.svg', colors: ['#BE1622', '#FFFFFF'] },
    { id: 97, name: 'Nice', league: 'Ligue 1', country: 'France', founded: 1904, stadium: 'Allianz Riviera', capacity: '36,178', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a4/OGC_Nice_logo.svg', colors: ['#ED1C24', '#000000'] },
    { id: 98, name: 'Rennes', league: 'Ligue 1', country: 'France', founded: 1901, stadium: 'Roazhon Park', capacity: '29,778', logo: 'https://upload.wikimedia.org/wikipedia/en/2/25/Stade_Rennais_FC.svg', colors: ['#D4002A', '#000000'] },
    { id: 99, name: 'Lens', league: 'Ligue 1', country: 'France', founded: 1906, stadium: 'Stade Bollaert-Delelis', capacity: '38,223', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d8/RC_Lens_logo.svg', colors: ['#FDD105', '#CC0000'] },

    // باقي MLS (5 فريق)
    { id: 100, name: 'New York City FC', league: 'MLS', country: 'USA', founded: 2013, stadium: 'Yankee Stadium', capacity: '30,000', logo: 'https://upload.wikimedia.org/wikipedia/en/5/59/New_York_City_FC.svg', colors: ['#6CACE4', '#00285E'] },
    { id: 101, name: 'Portland Timbers', league: 'MLS', country: 'USA', founded: 2009, stadium: 'Providence Park', capacity: '25,218', logo: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Portland_Timbers_logo.svg', colors: ['#004812', '#D69A00'] },
    { id: 102, name: 'Toronto FC', league: 'MLS', country: 'Canada', founded: 2005, stadium: 'BMO Field', capacity: '30,000', logo: 'https://upload.wikimedia.org/wikipedia/en/9/90/Toronto_FC_Logo.svg', colors: ['#B81137', '#FFFFFF'] },
    { id: 103, name: 'Vancouver Whitecaps', league: 'MLS', country: 'Canada', founded: 2009, stadium: 'BC Place', capacity: '22,120', logo: 'https://upload.wikimedia.org/wikipedia/en/8/85/Vancouver_Whitecaps_FC_logo.svg', colors: ['#9DC2EA', '#003967'] },
    { id: 104, name: 'CF Montréal', league: 'MLS', country: 'Canada', founded: 2010, stadium: 'Stade Saputo', capacity: '19,619', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a2/CF_Montreal_logo.svg', colors: ['#00529B', '#000000'] },

    // الدوري الياباني (4 فريق)
    { id: 105, name: 'Kashima Antlers', league: 'J1 League', country: 'Japan', founded: 1947, stadium: 'Kashima Soccer Stadium', capacity: '40,728', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Kashima_Antlers_logo.svg', colors: ['#DC143C', '#000080'] },
    { id: 106, name: 'Urawa Red Diamonds', league: 'J1 League', country: 'Japan', founded: 1950, stadium: 'Saitama Stadium 2002', capacity: '63,700', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Urawa_Red_Diamonds_logo.svg', colors: ['#ED1C24', '#000000'] },
    { id: 107, name: 'Yokohama F. Marinos', league: 'J1 League', country: 'Japan', founded: 1972, stadium: 'Nissan Stadium', capacity: '72,327', logo: 'https://upload.wikimedia.org/wikipedia/en/9/94/Yokohama_F._Marinos_logo.svg', colors: ['#004A99', '#E6001A'] },
    { id: 108, name: 'Vissel Kobe', league: 'J1 League', country: 'Japan', founded: 1995, stadium: 'Noevir Stadium Kobe', capacity: '30,132', logo: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Vissel_Kobe_logo.svg', colors: ['#8B0000', '#FFFFFF'] },

    // الدوري الكوري الجنوبي (3 فريق)
    { id: 109, name: 'Jeonbuk Hyundai Motors', league: 'K League 1', country: 'South Korea', founded: 1994, stadium: 'Jeonju World Cup Stadium', capacity: '42,477', logo: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Jeonbuk_Hyundai_Motors_FC_logo.svg', colors: ['#006341', '#FFFFFF'] },
    { id: 110, name: 'Ulsan Hyundai', league: 'K League 1', country: 'South Korea', founded: 1983, stadium: 'Ulsan Munsu Football Stadium', capacity: '44,102', logo: 'https://upload.wikimedia.org/wikipedia/en/8/89/Ulsan_Hyundai_FC_logo.svg', colors: ['#003882', '#F58220'] },
    { id: 111, name: 'FC Seoul', league: 'K League 1', country: 'South Korea', founded: 1983, stadium: 'Seoul World Cup Stadium', capacity: '66,704', logo: 'https://upload.wikimedia.org/wikipedia/en/d/dc/FC_Seoul_logo.svg', colors: ['#ED1C24', '#000000'] },

    // الدوري الإماراتي (4 فريق)
    { id: 112, name: 'Al Ain', league: 'UAE Pro League', country: 'UAE', founded: 1968, stadium: 'Hazza bin Zayed Stadium', capacity: '25,000', logo: 'https://upload.wikimedia.org/wikipedia/en/1/14/Al-Ain_FC_Logo.svg', colors: ['#702F8A', '#FFFFFF'] },
    { id: 113, name: 'Al Wahda', league: 'UAE Pro League', country: 'UAE', founded: 1974, stadium: 'Al Nahyan Stadium', capacity: '12,000', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b5/Al-Wahda_FC_logo.svg', colors: ['#8B0000', '#FFFFFF'] },
    { id: 114, name: 'Sharjah FC', league: 'UAE Pro League', country: 'UAE', founded: 1966, stadium: 'Sharjah Stadium', capacity: '12,000', logo: 'https://upload.wikimedia.org/wikipedia/en/9/98/Sharjah_FC_logo.svg', colors: ['#003399', '#FFFFFF'] },
    { id: 115, name: 'Al Jazira', league: 'UAE Pro League', country: 'UAE', founded: 1974, stadium: 'Mohammed bin Zayed Stadium', capacity: '42,056', logo: 'https://upload.wikimedia.org/wikipedia/en/7/73/Al_Jazira_Club_logo.svg', colors: ['#DC143C', '#FFFFFF'] },

    // الدوري القطري (3 فريق)
    { id: 116, name: 'Al Sadd', league: 'Qatar Stars League', country: 'Qatar', founded: 1969, stadium: 'Jassim bin Hamad Stadium', capacity: '12,946', logo: 'https://upload.wikimedia.org/wikipedia/en/d/de/Al_Sadd_SC_logo.svg', colors: ['#000080', '#FFD700'] },
    { id: 117, name: 'Al Duhail', league: 'Qatar Stars League', country: 'Qatar', founded: 2009, stadium: 'Abdullah bin Khalifa Stadium', capacity: '12,000', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2d/Al_Duhail_SC_logo.svg', colors: ['#ED1C24', '#000000'] },
    { id: 118, name: 'Al Rayyan', league: 'Qatar Stars League', country: 'Qatar', founded: 1967, stadium: 'Ahmed bin Ali Stadium', capacity: '40,000', logo: 'https://upload.wikimedia.org/wikipedia/en/7/72/Al-Rayyan_SC_logo.svg', colors: ['#003399', '#FFFFFF'] },

    // باقي Egyptian Premier League (2 فريق)
    { id: 119, name: 'Ismaily', league: 'Egyptian Premier League', country: 'Egypt', founded: 1924, stadium: 'Ismailia Stadium', capacity: '18,525', logo: 'https://upload.wikimedia.org/wikipedia/en/d/db/Ismaily_SC_logo.svg', colors: ['#FFD700', '#006400'] },
    { id: 120, name: 'El Gouna', league: 'Egyptian Premier League', country: 'Egypt', founded: 2003, stadium: 'El Gouna Stadium', capacity: '14,000', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a0/El_Gouna_FC_logo.svg', colors: ['#0066CC', '#FFFFFF'] },

    // باقي Premier League (5 فريق)
    { id: 121, name: 'Crystal Palace', league: 'Premier League', country: 'England', founded: 1905, stadium: 'Selhurst Park', capacity: '25,486', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Crystal_Palace_FC_logo_%282022%29.svg', colors: ['#1B458F', '#C4122E'] },
    { id: 122, name: 'Fulham', league: 'Premier League', country: 'England', founded: 1879, stadium: 'Craven Cottage', capacity: '29,600', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg', colors: ['#FFFFFF', '#000000'] },
    { id: 123, name: 'Brentford', league: 'Premier League', country: 'England', founded: 1889, stadium: 'Gtech Community Stadium', capacity: '17,250', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg', colors: ['#D20000', '#FFD700'] },
    { id: 124, name: 'Bournemouth', league: 'Premier League', country: 'England', founded: 1899, stadium: 'Vitality Stadium', capacity: '11,379', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_%282013%29.svg', colors: ['#DA291C', '#000000'] },
    { id: 125, name: 'Nottingham Forest', league: 'Premier League', country: 'England', founded: 1865, stadium: 'City Ground', capacity: '30,445', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Nottingham_Forest_F.C._logo.svg', colors: ['#DD0000', '#FFFFFF'] },

    // باقي La Liga (9 فريق)
    { id: 126, name: 'Getafe', league: 'La Liga', country: 'Spain', founded: 1946, stadium: 'Coliseum Alfonso Pérez', capacity: '17,393', logo: 'https://upload.wikimedia.org/wikipedia/en/4/46/Getafe_logo.svg', colors: ['#005DAA', '#FFFFFF'] },
    { id: 127, name: 'Osasuna', league: 'La Liga', country: 'Spain', founded: 1920, stadium: 'El Sadar', capacity: '23,576', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c2/CA_Osasuna_logo.svg', colors: ['#C8102E', '#001489'] },
    { id: 128, name: 'Rayo Vallecano', league: 'La Liga', country: 'Spain', founded: 1924, stadium: 'Campo de Fútbol de Vallecas', capacity: '14,708', logo: 'https://upload.wikimedia.org/wikipedia/en/1/17/Rayo_Vallecano_logo.svg', colors: ['#ED1C24', '#FFFFFF'] },
    { id: 129, name: 'Mallorca', league: 'La Liga', country: 'Spain', founded: 1916, stadium: 'Visit Mallorca Estadi', capacity: '23,142', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e0/RCD_Mallorca.svg', colors: ['#E20613', '#000000'] },
    { id: 130, name: 'Girona', league: 'La Liga', country: 'Spain', founded: 1930, stadium: 'Estadi Montilivi', capacity: '14,624', logo: 'https://upload.wikimedia.org/wikipedia/en/7/70/Girona_FC_Logo.svg', colors: ['#C8102E', '#FFFFFF'] },
    { id: 131, name: 'Alavés', league: 'La Liga', country: 'Spain', founded: 1921, stadium: 'Mendizorrotza', capacity: '19,840', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Deportivo_Alaves_logo_%282020%29.svg', colors: ['#0054A5', '#FFFFFF'] },
    { id: 132, name: 'Las Palmas', league: 'La Liga', country: 'Spain', founded: 1949, stadium: 'Estadio Gran Canaria', capacity: '32,400', logo: 'https://upload.wikimedia.org/wikipedia/en/2/20/UD_Las_Palmas_logo.svg', colors: ['#FFD800', '#003DA5'] },
    { id: 133, name: 'Espanyol', league: 'La Liga', country: 'Spain', founded: 1900, stadium: 'RCDE Stadium', capacity: '40,500', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7c/RCD_Espanyol_logo.svg', colors: ['#0082CA', '#FFFFFF'] },
    { id: 134, name: 'Granada', league: 'La Liga', country: 'Spain', founded: 1931, stadium: 'Nuevo Los Cármenes', capacity: '19,336', logo: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Granada_CF_logo.svg', colors: ['#ED1C24', '#FFFFFF'] },

    // باقي Serie A (7 فريق)
    { id: 135, name: 'Monza', league: 'Serie A', country: 'Italy', founded: 1912, stadium: 'U-Power Stadium', capacity: '18,568', logo: 'https://upload.wikimedia.org/wikipedia/en/1/1a/AC_Monza_logo.svg', colors: ['#ED1C24', '#FFFFFF'] },
    { id: 136, name: 'Lecce', league: 'Serie A', country: 'Italy', founded: 1908, stadium: 'Stadio Via del Mare', capacity: '40,670', logo: 'https://upload.wikimedia.org/wikipedia/en/8/83/U.S._Lecce_logo.svg', colors: ['#FFD200', '#D8232A'] },
    { id: 137, name: 'Empoli', league: 'Serie A', country: 'Italy', founded: 1920, stadium: 'Stadio Carlo Castellani', capacity: '16,800', logo: 'https://upload.wikimedia.org/wikipedia/en/5/55/Empoli_FC_logo.svg', colors: ['#004EA2', '#FFFFFF'] },
    { id: 138, name: 'Cagliari', league: 'Serie A', country: 'Italy', founded: 1920, stadium: 'Unipol Domus', capacity: '16,233', logo: 'https://upload.wikimedia.org/wikipedia/en/4/43/Cagliari_Calcio_1920.svg', colors: ['#B21F32', '#003DA5'] },
    { id: 139, name: 'Verona', league: 'Serie A', country: 'Italy', founded: 1903, stadium: 'Stadio Marcantonio Bentegodi', capacity: '39,371', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/Hellas_Verona_FC_logo.svg', colors: ['#0033A0', '#FFD700'] },
    { id: 140, name: 'Genoa', league: 'Serie A', country: 'Italy', founded: 1893, stadium: 'Stadio Luigi Ferraris', capacity: '36,599', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b8/Genoa_CFC_logo.svg', colors: ['#B81F33', '#003DA5'] },
    { id: 141, name: 'Parma', league: 'Serie A', country: 'Italy', founded: 1913, stadium: 'Stadio Ennio Tardini', capacity: '27,906', logo: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Parma_Calcio_1913_logo.svg', colors: ['#FFDB00', '#FFFFFF'] },

    // باقي Bundesliga (5 فريق)
    { id: 142, name: 'Hoffenheim', league: 'Bundesliga', country: 'Germany', founded: 1899, stadium: 'PreZero Arena', capacity: '30,150', logo: 'https://upload.wikimedia.org/wikipedia/en/e/ed/TSG_1899_Hoffenheim_logo.svg', colors: ['#1961B5', '#FFFFFF'] },
    { id: 143, name: 'Wolfsburg', league: 'Bundesliga', country: 'Germany', founded: 1945, stadium: 'Volkswagen Arena', capacity: '30,000', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f3/VfL_Wolfsburg_logo.svg', colors: ['#65B32E', '#FFFFFF'] },
    { id: 144, name: 'Mainz 05', league: 'Bundesliga', country: 'Germany', founded: 1905, stadium: 'Mewa Arena', capacity: '34,000', logo: 'https://upload.wikimedia.org/wikipedia/en/5/50/Mainz_05_logo.svg', colors: ['#C3011E', '#FFFFFF'] },
    { id: 145, name: 'FC Augsburg', league: 'Bundesliga', country: 'Germany', founded: 1907, stadium: 'WWK Arena', capacity: '30,660', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a9/FC_Augsburg_logo.svg', colors: ['#BA3733', '#FFFFFF'] },
    { id: 146, name: 'FC Köln', league: 'Bundesliga', country: 'Germany', founded: 1948, stadium: 'RheinEnergieStadion', capacity: '50,000', logo: 'https://upload.wikimedia.org/wikipedia/en/1/15/1_FC_Koln_logo.svg', colors: ['#ED1C24', '#FFFFFF'] },

    // باقي Ligue 1 (6 فريق)
    { id: 147, name: 'Strasbourg', league: 'Ligue 1', country: 'France', founded: 1906, stadium: 'Stade de la Meinau', capacity: '26,109', logo: 'https://upload.wikimedia.org/wikipedia/en/8/80/Racing_Club_de_Strasbourg_Alsace_logo.svg', colors: ['#0099CC', '#FFFFFF'] },
    { id: 148, name: 'Montpellier', league: 'Ligue 1', country: 'France', founded: 1919, stadium: 'Stade de la Mosson', capacity: '32,939', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Montpellier_HSC_logo.svg', colors: ['#0E62A0', '#F5822A'] },
    { id: 149, name: 'Nantes', league: 'Ligue 1', country: 'France', founded: 1943, stadium: 'Stade de la Beaujoire', capacity: '37,463', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a1/FC_Nantes_logo.svg', colors: ['#FFD800', '#006633'] },
    { id: 150, name: 'Toulouse', league: 'Ligue 1', country: 'France', founded: 1970, stadium: 'Stadium de Toulouse', capacity: '33,150', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Toulouse_FC_logo.svg', colors: ['#542C84', '#FFFFFF'] },
    { id: 151, name: 'Reims', league: 'Ligue 1', country: 'France', founded: 1910, stadium: 'Stade Auguste Delaune', capacity: '21,684', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Stade_Reims_logo.svg', colors: ['#E30613', '#FFFFFF'] },
    { id: 152, name: 'Brest', league: 'Ligue 1', country: 'France', founded: 1950, stadium: 'Stade Francis-Le Blé', capacity: '15,931', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b6/Stade_Brestois_29_logo.svg', colors: ['#E30613', '#FFFFFF'] },

    // باقي Egyptian Premier League (8 فريق)
    { id: 153, name: 'Ceramica Cleopatra', league: 'Egyptian Premier League', country: 'Egypt', founded: 2006, stadium: '30 June Stadium', capacity: '30,000', logo: 'https://upload.wikimedia.org/wikipedia/en/8/87/Ceramica_Cleopatra_FC_logo.svg', colors: ['#00A859', '#FFFFFF'] },
    { id: 154, name: 'ENPPI', league: 'Egyptian Premier League', country: 'Egypt', founded: 1985, stadium: 'Petrosport Stadium', capacity: '25,000', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/ENPPI_SC_logo.svg', colors: ['#FFD700', '#003399'] },
    { id: 155, name: 'Smouha', league: 'Egyptian Premier League', country: 'Egypt', founded: 1949, stadium: 'Alexandria Stadium', capacity: '20,000', logo: 'https://upload.wikimedia.org/wikipedia/en/1/15/Smouha_SC_logo.svg', colors: ['#0066CC', '#FFFFFF'] },
    { id: 156, name: 'Al Ittihad Alexandria', league: 'Egyptian Premier League', country: 'Egypt', founded: 1914, stadium: 'Alexandria Stadium', capacity: '20,000', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Al-Ittihad_Alexandria_Club_logo.svg', colors: ['#FFD700', '#006B3F'] },
    { id: 157, name: 'Ghazl El Mahalla', league: 'Egyptian Premier League', country: 'Egypt', founded: 1936, stadium: 'Ghazl El Mahalla Stadium', capacity: '20,000', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Ghazl_El-Mahalla_SC_logo.svg', colors: ['#006400', '#FFFFFF'] },
    { id: 158, name: 'Al Mokawloon', league: 'Egyptian Premier League', country: 'Egypt', founded: 1973, stadium: 'Osman Ahmed Osman Stadium', capacity: '28,500', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cb/Al_Mokawloon_logo.svg', colors: ['#FFD700', '#000080'] },
    { id: 159, name: 'Pharco FC', league: 'Egyptian Premier League', country: 'Egypt', founded: 2009, stadium: 'Pharco Stadium', capacity: '15,000', logo: 'https://upload.wikimedia.org/wikipedia/en/9/92/Pharco_FC_logo.svg', colors: ['#FF6600', '#000000'] },
    { id: 160, name: 'National Bank of Egypt SC', league: 'Egyptian Premier League', country: 'Egypt', founded: 2016, stadium: 'Petrosport Stadium', capacity: '25,000', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e4/NBE_SC_logo.svg', colors: ['#006B3F', '#FFD700'] },

    // باقي Premier League (5 فريق)
    { id: 161, name: 'Southampton', league: 'Premier League', country: 'England', founded: 1885, stadium: 'St Mary\'s Stadium', capacity: '32,384', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c9/FC_Southampton.svg', colors: ['#ED1A3B', '#130C0E'] },
    { id: 162, name: 'Burnley', league: 'Premier League', country: 'England', founded: 1882, stadium: 'Turf Moor', capacity: '21,944', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6d/Burnley_F.C._Logo.svg', colors: ['#6C1D45', '#99D6EA'] },
    { id: 163, name: 'Sheffield United', league: 'Premier League', country: 'England', founded: 1889, stadium: 'Bramall Lane', capacity: '32,050', logo: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Sheffield_United_FC_logo.svg', colors: ['#EE2737', '#000000'] },
    { id: 164, name: 'Luton Town', league: 'Premier League', country: 'England', founded: 1885, stadium: 'Kenilworth Road', capacity: '10,356', logo: 'https://upload.wikimedia.org/wikipedia/en/8/8b/LutonTownFC2009.svg', colors: ['#F78F1E', '#002D62'] },
    { id: 165, name: 'Ipswich Town', league: 'Premier League', country: 'England', founded: 1878, stadium: 'Portman Road', capacity: '30,311', logo: 'https://upload.wikimedia.org/wikipedia/en/4/43/Ipswich_Town.svg', colors: ['#0033A0', '#FFFFFF'] },

    // باقي La Liga (5 فريق)
    { id: 166, name: 'Valladolid', league: 'La Liga', country: 'Spain', founded: 1928, stadium: 'Estadio José Zorrilla', capacity: '27,846', logo: 'https://upload.wikimedia.org/wikipedia/en/6/69/Real_Valladolid_Logo.svg', colors: ['#6A1B9A', '#FFFFFF'] },
    { id: 167, name: 'Almería', league: 'La Liga', country: 'Spain', founded: 1989, stadium: 'Power Horse Stadium', capacity: '15,200', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a0/UD_Almeria_logo.svg', colors: ['#ED1C24', '#FFFFFF'] },
    { id: 168, name: 'Elche', league: 'La Liga', country: 'Spain', founded: 1923, stadium: 'Estadio Manuel Martínez Valero', capacity: '33,732', logo: 'https://upload.wikimedia.org/wikipedia/en/2/23/Elche_CF_logo.svg', colors: ['#006633', '#FFFFFF'] },
    { id: 169, name: 'Cadiz', league: 'La Liga', country: 'Spain', founded: 1910, stadium: 'Nuevo Mirandilla', capacity: '25,033', logo: 'https://upload.wikimedia.org/wikipedia/en/5/58/Cadiz_CF_logo.svg', colors: ['#FFD700', '#003DA5'] },
    { id: 170, name: 'Real Valladolid', league: 'La Liga', country: 'Spain', founded: 1928, stadium: 'Estadio José Zorrilla', capacity: '27,846', logo: 'https://upload.wikimedia.org/wikipedia/en/6/69/Real_Valladolid_Logo.svg', colors: ['#6A1B9A', '#FFFFFF'] },

    // باقي Saudi Pro League (4 فريق)
    { id: 171, name: 'Al-Fateh', league: 'Saudi Pro League', country: 'Saudi Arabia', founded: 1958, stadium: 'Prince Abdullah bin Jalawi Stadium', capacity: '14,000', logo: 'https://upload.wikimedia.org/wikipedia/en/e/ec/Al-Fath_SC_logo.svg', colors: ['#FFD700', '#000000'] },
    { id: 172, name: 'Al-Taawoun', league: 'Saudi Pro League', country: 'Saudi Arabia', founded: 1956, stadium: 'King Abdullah Sport City Stadium', capacity: '14,000', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Al-Taawoun_FC_logo.svg', colors: ['#FFD700', '#8B4513'] },
    { id: 173, name: 'Damac FC', league: 'Saudi Pro League', country: 'Saudi Arabia', founded: 1972, stadium: 'Prince Sultan bin Abdulaziz Stadium', capacity: '7,000', logo: 'https://upload.wikimedia.org/wikipedia/en/a/ab/Damac_FC_logo.svg', colors: ['#FF6600', '#000000'] },
    { id: 174, name: 'Al-Fayha', league: 'Saudi Pro League', country: 'Saudi Arabia', founded: 1954, stadium: 'Al-Majma\'ah Sports City Stadium', capacity: '10,000', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Al-Fayha_FC_logo.svg', colors: ['#006633', '#FFD700'] },

    // باقي Primeira Liga (2 فريق)
    { id: 175, name: 'Vitória Guimarães', league: 'Primeira Liga', country: 'Portugal', founded: 1922, stadium: 'Estádio D. Afonso Henriques', capacity: '30,029', logo: 'https://upload.wikimedia.org/wikipedia/en/d/de/Vitoria_Guimaraes.svg', colors: ['#FFFFFF', '#000000'] },
    { id: 176, name: 'Boavista', league: 'Primeira Liga', country: 'Portugal', founded: 1903, stadium: 'Estádio do Bessa', capacity: '28,263', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a1/Boavista_FC_logo.svg', colors: ['#000000', '#FFFFFF'] },

    // المزيد من MLS (5 فريق)
    { id: 177, name: 'Chicago Fire', league: 'MLS', country: 'USA', founded: 1997, stadium: 'Soldier Field', capacity: '61,500', logo: 'https://upload.wikimedia.org/wikipedia/en/3/35/Chicago_Fire_FC_logo.svg', colors: ['#C8102E', '#003DA5'] },
    { id: 178, name: 'New York Red Bulls', league: 'MLS', country: 'USA', founded: 1995, stadium: 'Red Bull Arena', capacity: '25,000', logo: 'https://upload.wikimedia.org/wikipedia/en/4/4b/New_York_Red_Bulls_logo.svg', colors: ['#ED1E36', '#FFFFFF'] },
    { id: 179, name: 'Columbus Crew', league: 'MLS', country: 'USA', founded: 1994, stadium: 'Lower.com Field', capacity: '20,371', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Columbus_Crew_logo.svg', colors: ['#FFD700', '#000000'] },
    { id: 180, name: 'Philadelphia Union', league: 'MLS', country: 'USA', founded: 2008, stadium: 'Subaru Park', capacity: '18,500', logo: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Philadelphia_Union_logo.svg', colors: ['#B1946C', '#071B2C'] },
    { id: 181, name: 'DC United', league: 'MLS', country: 'USA', founded: 1995, stadium: 'Audi Field', capacity: '20,000', logo: 'https://upload.wikimedia.org/wikipedia/en/7/70/DC_United_logo.svg', colors: ['#EF3E42', '#000000'] },

    // المزيد من Brasileirão (3 فريق)
    { id: 182, name: 'Santos', league: 'Brasileirão', country: 'Brazil', founded: 1912, stadium: 'Vila Belmiro', capacity: '20,120', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Santos_FC_logo.svg', colors: ['#000000', '#FFFFFF'] },
    { id: 183, name: 'Grêmio', league: 'Brasileirão', country: 'Brazil', founded: 1903, stadium: 'Arena do Grêmio', capacity: '60,540', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Gremio_logo.svg', colors: ['#0099CC', '#000000'] },
    { id: 184, name: 'Atlético Mineiro', league: 'Brasileirão', country: 'Brazil', founded: 1908, stadium: 'Arena MRV', capacity: '46,000', logo: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Clube_Atletico_Mineiro_logo.svg', colors: ['#000000', '#FFFFFF'] },

    // المزيد من Eredivisie (2 فريق)
    { id: 185, name: 'FC Utrecht', league: 'Eredivisie', country: 'Netherlands', founded: 1970, stadium: 'Stadion Galgenwaard', capacity: '24,426', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c2/FC_Utrecht.svg', colors: ['#C8102E', '#FFFFFF'] },
    { id: 186, name: 'FC Twente', league: 'Eredivisie', country: 'Netherlands', founded: 1965, stadium: 'De Grolsch Veste', capacity: '30,205', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/FC_Twente.svg', colors: ['#ED1C24', '#FFFFFF'] },

    // المزيد من Süper Lig (2 فريق)
    { id: 187, name: 'Kasımpaşa', league: 'Süper Lig', country: 'Turkey', founded: 1921, stadium: 'Recep Tayyip Erdoğan Stadium', capacity: '14,234', logo: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Kasimpasa_S.K._logo.svg', colors: ['#000080', '#FFFFFF'] },
    { id: 188, name: 'Antalyaspor', league: 'Süper Lig', country: 'Turkey', founded: 1966, stadium: 'Antalya Stadium', capacity: '32,537', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f8/Antalyaspor_logo.svg', colors: ['#ED1C24', '#FFFFFF'] },

    // المزيد من Argentine Primera (2 فريق)
    { id: 189, name: 'San Lorenzo', league: 'Argentine Primera', country: 'Argentina', founded: 1908, stadium: 'Estadio Pedro Bidegain', capacity: '47,964', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/CA_San_Lorenzo_de_Almagro_logo.svg', colors: ['#C8102E', '#003DA5'] },
    { id: 190, name: 'Vélez Sarsfield', league: 'Argentine Primera', country: 'Argentina', founded: 1910, stadium: 'Estadio José Amalfitani', capacity: '49,540', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a1/Velez_Sarsfield_logo.svg', colors: ['#FFFFFF', '#0054A6'] },

    // دوريات إضافية - Liga MX المكسيكي (5 فريق)
    { id: 191, name: 'Club América', league: 'Liga MX', country: 'Mexico', founded: 1916, stadium: 'Estadio Azteca', capacity: '87,000', logo: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Club_America_logo.svg', colors: ['#FFED00', '#002D62'] },
    { id: 192, name: 'Guadalajara (Chivas)', league: 'Liga MX', country: 'Mexico', founded: 1906, stadium: 'Estadio Akron', capacity: '49,850', logo: 'https://upload.wikimedia.org/wikipedia/en/8/8a/C.D._Guadalajara_logo.svg', colors: ['#ED1C24', '#003DA5'] },
    { id: 193, name: 'Cruz Azul', league: 'Liga MX', country: 'Mexico', founded: 1927, stadium: 'Estadio Azteca', capacity: '87,000', logo: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Cruz_Azul_logo.svg', colors: ['#003E7E', '#FFFFFF'] },
    { id: 194, name: 'Tigres UANL', league: 'Liga MX', country: 'Mexico', founded: 1960, stadium: 'Estadio Universitario', capacity: '41,615', logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/Club_de_Futbol_Tigres_de_la_UANL_logo.svg', colors: ['#FFD200', '#003A70'] },
    { id: 195, name: 'Monterrey', league: 'Liga MX', country: 'Mexico', founded: 1945, stadium: 'Estadio BBVA', capacity: '53,500', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d0/CF_Monterrey_logo.svg', colors: ['#003A70', '#FFFFFF'] },

    // المزيد من J1 League (2 فريق)
    { id: 196, name: 'Gamba Osaka', league: 'J1 League', country: 'Japan', founded: 1980, stadium: 'Panasonic Stadium Suita', capacity: '40,000', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Gamba_Osaka_logo.svg', colors: ['#003DA5', '#000000'] },
    { id: 197, name: 'Kawasaki Frontale', league: 'J1 League', country: 'Japan', founded: 1955, stadium: 'Todoroki Athletics Stadium', capacity: '27,495', logo: 'https://upload.wikimedia.org/wikipedia/en/4/42/Kawasaki_Frontale_logo.svg', colors: ['#6CACE4', '#000000'] },

    // المزيد من K League 1 (2 فريق)
    { id: 198, name: 'Suwon Samsung Bluewings', league: 'K League 1', country: 'South Korea', founded: 1995, stadium: 'Suwon World Cup Stadium', capacity: '43,959', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6d/Suwon_Samsung_Bluewings_FC_logo.svg', colors: ['#003DA5', '#6CACE4'] },
    { id: 199, name: 'Pohang Steelers', league: 'K League 1', country: 'South Korea', founded: 1973, stadium: 'Pohang Steel Yard', capacity: '25,000', logo: 'https://upload.wikimedia.org/wikipedia/en/3/37/Pohang_Steelers_logo.svg', colors: ['#ED1C24', '#000000'] },

    // Copa Libertadores - أشهر نادي من كولومبيا
    { id: 200, name: 'Atlético Nacional', league: 'Liga BetPlay', country: 'Colombia', founded: 1947, stadium: 'Estadio Atanasio Girardot', capacity: '40,043', logo: 'https://upload.wikimedia.org/wikipedia/en/1/16/Atletico_Nacional_Logo.svg', colors: ['#00954C', '#FFFFFF'] },
  ];

    const leagues: string[] = ['all', ...Array.from(new Set(teams.map((t: any) => t.league)))];
  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          team.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLeague = selectedLeague === 'all' || team.league === selectedLeague;
      return matchesSearch && matchesLeague;
    });
  }, [searchTerm, selectedLeague]);

  if (selectedTeam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedTeam(null)}
            className="mb-4 sm:mb-6 px-4 py-2 text-sm sm:text-base bg-gray-700 hover:bg-gray-600 rounded-lg transition flex items-center gap-2"
          >
            ← Back to Teams
          </button>

          <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div className="relative">
                <div 
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center shadow-2xl relative border-4 border-gray-700"
                  style={{ background: `linear-gradient(135deg, ${selectedTeam.colors[0]}, ${selectedTeam.colors[1]})` }}
                >
                  {failedLogos.has(selectedTeam.id) ? (
                    <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-white drop-shadow-2xl">
                      {selectedTeam.name.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <img
                      src={selectedTeam.logo}
                      alt={selectedTeam.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain z-10"
                      onError={() => {
                        setFailedLogos(prev => new Set(prev).add(selectedTeam.id));
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{selectedTeam.name}</h1>
                <p className="text-xl sm:text-2xl text-cyan-400 mb-4">{selectedTeam.league}</p>
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700 rounded-full text-xs sm:text-sm">
                    🌍 {selectedTeam.country}
                  </span>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700 rounded-full text-xs sm:text-sm">
                    📅 Founded {selectedTeam.founded}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-700 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <MapPin className="text-cyan-400 flex-shrink-0" size={20} />
                  <h3 className="text-lg sm:text-xl font-bold">Stadium</h3>
                </div>
                <p className="text-xl sm:text-2xl mb-2 line-clamp-2">{selectedTeam.stadium}</p>
                <p className="text-gray-400 text-sm sm:text-base">Capacity: {selectedTeam.capacity}</p>
              </div>

              <div className="bg-gray-700 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <Calendar className="text-cyan-400 flex-shrink-0" size={20} />
                  <h3 className="text-lg sm:text-xl font-bold">History</h3>
                </div>
                <p className="text-xl sm:text-2xl mb-2">{new Date().getFullYear() - selectedTeam.founded} Years</p>
                <p className="text-gray-400 text-sm sm:text-base">Since {selectedTeam.founded}</p>
              </div>

              <div className="bg-gray-700 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <Trophy className="text-cyan-400 flex-shrink-0" size={20} />
                  <h3 className="text-lg sm:text-xl font-bold">Competition</h3>
                </div>
                <p className="text-base sm:text-lg line-clamp-1">{selectedTeam.league}</p>
                <p className="text-gray-400 text-sm sm:text-base">{selectedTeam.country}</p>
              </div>

              <div className="bg-gray-700 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <Users className="text-cyan-400 flex-shrink-0" size={20} />
                  <h3 className="text-lg sm:text-xl font-bold">Team Colors</h3>
                </div>
                <div className="flex gap-3">
                  {selectedTeam.colors.map((color: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-gray-600"
                style={{ backgroundColor: color }}
                />

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Teams
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">Explore {teams.length}+ football clubs from around the world</p>
        </div>

        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search teams or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-400 transition cursor-pointer"
          >
            {leagues.map(league => (
              <option key={league} value={league}>
                {league === 'all' ? 'All Leagues' : league}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredTeams.map(team => (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className="bg-gray-800 rounded-xl p-4 sm:p-6 hover:bg-gray-750 transition cursor-pointer group border border-gray-700 hover:border-cyan-400"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center relative shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${team.colors[0]}, ${team.colors[1]})` }}
                >
                  {failedLogos.has(team.id) ? (
                    <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                      {team.name.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-10 h-10 sm:w-14 sm:h-14 object-contain z-10"
                      onError={() => {
                        setFailedLogos(prev => new Set(prev).add(team.id));
                      }}
                    />
                  )}
                </div>
                <ChevronRight className="text-gray-600 group-hover:text-cyan-400 transition flex-shrink-0" size={20} />
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-cyan-400 transition line-clamp-1">
                {team.name}
              </h3>
              
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <p className="flex items-center gap-2">
                  <Trophy size={14} className="text-cyan-400 flex-shrink-0" />
                  <span className="line-clamp-1">{team.league}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={14} className="text-cyan-400 flex-shrink-0" />
                  <span className="line-clamp-1">{team.country}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar size={14} className="text-cyan-400 flex-shrink-0" />
                  Est. {team.founded}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No teams found</p>
            <p className="text-gray-600 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;