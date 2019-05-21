/*
 
 
 
 

 
 
 
 
 

 
 
 
 

 
 
 */
package handling.channel;

import database.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

public class MapleGuildRanking {

    private static final MapleGuildRanking instance = new MapleGuildRanking();
    private final List<GuildRankingInfo> ranks = new LinkedList<>();

    public static MapleGuildRanking getInstance() {
        return instance;
    }

    public void load() {
        if (ranks.isEmpty()) {
            reload();
        }
    }

    public List<GuildRankingInfo> getRank() {
        return ranks;
    }

    private void reload() {
        ranks.clear();
        try {
            Connection con = DatabaseConnection.getConnection();
            ResultSet rs;
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM guilds ORDER BY `GP` DESC LIMIT 50")) {
                rs = ps.executeQuery();
                while (rs.next()) {
                    final GuildRankingInfo rank = new GuildRankingInfo(
                            rs.getString("name"),
                            rs.getInt("GP"),
                            rs.getInt("logo"),
                            rs.getInt("logoColor"),
                            rs.getInt("logoBG"),
                            rs.getInt("logoBGColor"));
                    
                    ranks.add(rank);
                }
            }
            rs.close();
        } catch (SQLException e) {
            System.err.println("Error handling guildRanking");
        }
    }

    public static class GuildRankingInfo {

        private final String name;
        private final int gp, logo, logocolor, logobg, logobgcolor;

        public GuildRankingInfo(String name, int gp, int logo, int logocolor, int logobg, int logobgcolor) {
            this.name = name;
            this.gp = gp;
            this.logo = logo;
            this.logocolor = logocolor;
            this.logobg = logobg;
            this.logobgcolor = logobgcolor;
        }

        public String getName() {
            return name;
        }

        public int getGP() {
            return gp;
        }

        public int getLogo() {
            return logo;
        }

        public int getLogoColor() {
            return logocolor;
        }

        public int getLogoBg() {
            return logobg;
        }

        public int getLogoBgColor() {
            return logobgcolor;
        }
    }
}
