<?php

$myPDO = new PDO("pgsql:host=localhost; dbname=geoDatabase", "postgres","2359");

$case_ = $_POST["case"];

   switch ($case_)
   {
     case "uploadingData":

     $power_source  = $_POST['power_source'];
     $reservours    = $_POST['reservours'];
     $internet      = $_POST['internet'];
     $security      = $_POST['security'];
      
     $sql = " SELECT * FROM my_hub WHERE power_source = '".$power_source."' AND internet = '".$internet."' AND security = '".$security."' AND reservours ='".$reservours."' ";     

     $query = $myPDO->query($sql);
     $results = $query->fetchAll(PDO::FETCH_ASSOC); 
      
     echo json_encode($sql);
   
break;

   case "AddressRequest":

     $search_txt = $_POST['SearchTxt'];

     $sql2 = "SELECT * FROM addresses WHERE LOWER(address) LIKE LOWER('".$search_txt."%')  OR LOWER(name) LIKE LOWER('".$search_txt."%') OR LOWER(houseno_tx) LIKE LOWER('".$search_txt."%') OR LOWER(street) LIKE LOWER('%".$search_txt."%') ORDER BY address ASC LIMIT 20" ;

     $query = $myPDO->query($sql2);
     $results = $query->fetchAll(PDO::FETCH_ASSOC);

     echo json_encode($results);
break;

   case 'insert_data':
      try 
      {  
         $house_data = $_POST['houseInfoData'];
         if(isset($house_data))
         {
            $house_data = $_POST['houseInfoData'];       
            foreach ($house_data as $row)
            {
               $uid = [$row["data-meta-instanceID"]];
               $sql_check = 'SELECT * FROM "my_hub" WHERE uid = ?';
               $stmt_check = $myPDO->prepare($sql_check);
               if($stmt_check->execute($uid))
               {
                  $result = $stmt_check->rowCount();
                    if ($result==0) 
                    { 
                     $uid_ = $row["data-meta-instanceID"];
                  //   $date_str = $row["data-Date"];
                  //   $date_infor = explode("T", $date_str);
                  //   $date = $date_infor[0];
                  //   $date_infor_str = explode("-", $date);
                  //   $year = $date_infor_str[0];
                  //   $month = $months[(int)$date_infor_str[1]-1];
                  //   $week = "WEEK ".weekOfMonth($date);
                  //   $day = "DAY ".$date_infor_str[2];
                  //   $time_str = $date_infor[1];
                  //   $time_infor = explode(".", $time_str);
                  //   $time = $time_infor[0];
                     $care_taker = $row["data-care_taker"];
                     $security = $row["data-security"];
                     $tel = $row["data-phone_number"];
                     $room_price = $row["data-room_price"];
                     $reservours = $row["data-reservoir"];
                     $internet = $row["data-Internet"];
                     $power_source = $row["data-power_source"];
                     $other = $row["data-extras"];
                     $address = $row["data-address"];
                     $xy = $row["data-coordinates"];
                     $coordinates = explode(",", $xy);
                     $X = $coordinates[1];
                     $Y = $coordinates[0];
                     $geom = "POINT(".$X." ".$Y.")";

                      $sql = "INSERT INTO my_hub (care_taker, tel, room_price, address, reservours, internet, security, power_source, other, x, y, geom, uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                      $stmt = $myPDO->prepare($sql);
                      $data = [$care_taker, $tel, $room_price, $address, $reservours, $internet, $security, $power_sour, $other, $X, $Y, $geom, $uid_];
                                
                       
                       if($stmt->execute($data))
                     {
                        $inserted = $stmt->rowCount();
                        //echo json_encode("Uploaded: ".$inserted." records");
                        echo json_encode("Uploaded Successifully");
                     }
                     else
                     {
                        echo json_encode("Failed to upload: Please check sql querry");
                        
                     }
                    }
                    else
                    {
                     echo json_encode("Data Exists");    
                    }
               }
               else
               {
                  echo json_encode("failed");
               }
            }
         }
          
       } 
      catch (Exception $e) 
      {
         echo $e->getMessage();
      }
   break;

   case "allDataQuerry":
    
   $sql = "SELECT * FROM my_hub";     

   $query = $myPDO->query($sql);
   $results = $query->fetchAll(PDO::FETCH_ASSOC); 
    
   echo json_encode($results);
   
   break;   
}
?>

