#!/usr/bin/perl -w
#use Text::Iconv;
 
use warnings;
use strict;
use Spreadsheet::XLSX;
use Data::Dumper; 
use DBI;
#use config;

#my $db = DBI->connect($config::DB_host, $config::DB_user, $config::DB_pwd);

my $db = DBI->connect("DBI:mysql:buytogether:localhost:3306", "Preetam", "admin");
my $excel = Spreadsheet::XLSX -> new ('gurgaon_colleges.xlsx');

foreach my $sheet (@{$excel -> {Worksheet}}) 
{
	  
	 	  
     	##### loop over each row in the worsheet ###############
		foreach my $row ($sheet -> {MinRow} .. $sheet -> {MaxRow}) 
		{
			
			my $name_val = $sheet->{Cells}[$row][0]->{Val};
                            my $city_val = $sheet->{Cells}[$row][1]->{Val};
                            
                            
                            print $name_val ,"\n" ;
                            print $city_val ,"\n" ;
                            
                           my  $INSERT_PEOPLE = $db->prepare("INSERT INTO colleges (college_name,city)  values (?,?)");
		                   $INSERT_PEOPLE->execute($name_val ,$city_val) ;
		                   $INSERT_PEOPLE->finish;
			
        }
}

#my $converter = Text::Iconv -> new ("utf-8", "windows-1251");

 
# foreach my $sheet (@{$excel -> {Worksheet}}) {
# 
#        $sheet -> {MaxRow} ||= $sheet -> {MinRow};
#        
#         foreach my $row ($sheet -> {MinRow} .. $sheet -> {MaxRow}) {
#         
#                $sheet -> {MaxCol} ||= $sheet -> {MinCol};
#                
#                foreach my $col ($sheet -> {MinCol} ..  $sheet -> {MaxCol}) {
#                
#                        my $cell = $sheet -> {Cells} [$row] [$col];
# 
#                        if ($cell) {
#                            
#                            my $name_val = $sheet->{Cells}[$row][0]->{Val};
#                            my $city_val = $sheet->{Cells}[$row][1]->{Val};
#                            
#                            
#                            print $name_val ,"\n" ;
#                            print $city_val ,"\n" ;
#                            
#                           my  $INSERT_PEOPLE = $db->prepare("INSERT INTO colleges (college_name,city)  values (?,?)");
#		                   $INSERT_PEOPLE->execute($name_val ,$city_val) ;
#		                   $INSERT_PEOPLE->finish;
#                            
#                        }
# 
#                }
# 
#        }
# 
# }
        






