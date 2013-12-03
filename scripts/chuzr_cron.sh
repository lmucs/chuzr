crontab -l | MATCH=grep "00 09,17 * * * ./chuzr/scripts/load_shopzilla_data.sh" 
if [ -n "$MATCH" ];
  then
     echo "00 09,17 * * * ./chuzr/scripts/load_shopzilla_data.sh" | crontab
  else 
    echo "crontab has this job!"  
fi
