import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import MonitorIcon from "@mui/icons-material/Monitor";
import AddIcon from "@mui/icons-material/Add";
import StyleWrapper from "./FilterBar.style.js";

import { data as assessmentData } from "../../data/Assessment.js";

export default function FilterBar({ resultsFetched }: any) {
  const initialState = {
    keywords: [],
    sites: [],
    categories: [],
  };
  const [selectedFilters, setSelectedFilters] = useState<{
    keywords: string[];
    sites: string[];
    categories: string[];
  }>(initialState);
  const [filterBySite, setFilterBySite] = useState<string[]>([]);
  const [filterByCategory, setFilterByCategory] = useState<string[]>([]);
  const [dropdownSitesOpen, setDropdownSitesOpen] = useState(false);
  const [dropdownCategoriesOpen, setDropdownCategoriesOpen] = useState(false);

  const siteOptions = [
    {
      title: "LinkedIn",
      slug: "linkedin",
    },
    {
      title: "ProductHunt",
      slug: "producthunt",
    },
    {
      title: "Google",
      slug: "google",
    },
    {
      title: "Amazon",
      slug: "amazon",
    },
    {
      title: "Booking",
      slug: "booking",
    },
    {
      title: "FDA",
      slug: "fda",
    },
    {
      title: "Google Maps",
      slug: "google-maps",
    },
    {
      title: "Pinterest",
      slug: "pinterest",
    },
    {
      title: "Trip Advisor",
      slug: "trip-advisor",
    },
    {
      title: "Twitter",
      slug: "twitter",
    },
    {
      title: "Upwork",
      slug: "upwork",
    },
    {
      title: "Craigslist",
      slug: "craigslist",
    },
    {
      title: "Meetup",
      slug: "meetup",
    },
  ].sort((a, b) => (a.title < b.title ? -1 : 0));

  const categoryOptions = [
    {
      title: "Competitive Intelligence",
      slug: "competitive-intelligence",
    },
    {
      title: "SEO",
      slug: "seo",
    },
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const fetchResults = () => {
    let results = [...assessmentData].sort((a, b) => a.priority - b.priority);

    if (
      selectedFilters?.keywords?.length > 0 ||
      filterByCategory.length > 0 ||
      filterBySite.length > 0
    ) {
      results = results.filter((item) => {
        const keywordMatch = selectedFilters?.keywords?.some(
          (keyword) =>
            item.title.toLowerCase().includes(keyword) ||
            item.shortDescription.toLowerCase().includes(keyword)
        );

        const siteMatch = filterBySite.some((siteSlug) => {
          const matches = item.sites.some(
            (site) => site.slug.toLowerCase() === siteSlug
          );
          return matches;
        });

        const categoryMatch = filterByCategory.some((selectedCategory) =>
          item.categories.some(
            (cat) => cat.slug.toLowerCase() === selectedCategory
          )
        );

        return keywordMatch || siteMatch || categoryMatch;
      });
    }

    resultsFetched(results);
  };

  const resetAll = () => {
    setSelectedFilters(initialState);
    setFilterBySite([]);
    setFilterByCategory([]);
    fetchResults();
  };

  const toggleChip = (chipID: string) => {
    setSelectedFilters((selection) => {
      const existingIndex = selection.keywords.indexOf(chipID);
      if (existingIndex === -1) {
        selection.keywords.push(chipID);
      } else {
        selection.keywords.splice(existingIndex, 1);
      }
      return selection;
    });
    fetchResults();
  };

  const handleDropdownOpen = (dropdownType) => {
    if (dropdownType === "sites") {
      setDropdownSitesOpen(true);
    } else if (dropdownType === "categories") {
      setDropdownCategoriesOpen(true);
    }
  };

  const handleDropdownClose = (dropdownType) => {
    if (dropdownType === "sites") {
      setDropdownSitesOpen(false);
    } else if (dropdownType === "categories") {
      setDropdownCategoriesOpen(false);
    }
  };

  const handleDropdownChange = (filterType, event) => {
    const { value } = event.target;
    const filterValue = typeof value === "string" ? value.split(",") : value;

    if (filterType === "sites") {
      setFilterBySite(filterValue);
    } else if (filterType === "categories") {
      setFilterByCategory(filterValue);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [filterBySite, filterByCategory]);

  const handleSelectionDelete = (filterType, filterValue) => {
    if (filterType === "sites") {
      setFilterBySite((value) => value.filter((v) => v !== filterValue));
    } else if (filterType === "categories") {
      setFilterByCategory((value) => value.filter((v) => v !== filterValue));
    }

    setSelectedFilters((filters) => {
      filters[filterType] = filters[filterType]?.filter(
        (filter) => filter !== filterValue
      );
      return filters;
    });

    fetchResults();
  };

  return (
    <StyleWrapper>
      <div className="top">
        <span>
          Here are some Automations that pre-defined for product availability
          monitoring
        </span>
        <Button variant="text" color="secondary" onClick={resetAll}>
          See All
        </Button>
      </div>
      <Stack direction="row" spacing={1}>
        <Chip
          variant="outlined"
          icon={<ImportExportIcon fontSize="small" />}
          label="Extract Data"
          className={
            selectedFilters?.keywords?.includes("extract") ? "selected" : ""
          }
          onClick={() => toggleChip("extract")}
        />
        <Chip
          variant="outlined"
          icon={<MonitorIcon fontSize="small" />}
          label="Monitoring"
          className={
            selectedFilters?.keywords?.includes("monitor") ? "selected" : ""
          }
          onClick={() => toggleChip("monitor")}
        />
        {selectedFilters?.sites?.map((siteSlug) => {
          return (
            <ListItem disableGutters key={siteSlug}>
              <Chip
                label={siteSlug}
                onDelete={handleSelectionDelete("sites", siteSlug)}
              />
            </ListItem>
          );
        })}
        <div className="dropdown-chip-container">
          <Chip
            variant="outlined"
            icon={<AddIcon />}
            label="Filter by Site"
            onClick={() => handleDropdownOpen("sites")}
          />
          <FormControl sx={{ m: 1, width: 300 }} size="small">
            <Select
              multiple
              value={filterBySite}
              open={dropdownSitesOpen}
              onClose={() => handleDropdownClose("sites")}
              onOpen={() => handleDropdownOpen("sites")}
              onChange={(e: any) => {
                handleDropdownChange("sites", e);
              }}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {siteOptions?.map((site: { title: string; slug: string }) => (
                <MenuItem key={site.slug} value={site.slug}>
                  <Checkbox checked={filterBySite?.indexOf(site.slug) > -1} />
                  <ListItemText primary={site.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {selectedFilters?.categories?.map((categorySlug) => {
          return (
            <ListItem disableGutters key={categorySlug}>
              <Chip
                label={categorySlug}
                onDelete={handleSelectionDelete("categories", categorySlug)}
              />
            </ListItem>
          );
        })}
        <div className="dropdown-chip-container">
          <Chip
            variant="outlined"
            icon={<AddIcon />}
            label="Filter by Categorie"
            onClick={() => handleDropdownOpen("categories")}
          />
          <FormControl sx={{ m: 1, width: 300 }} size="small">
            <Select
              multiple
              value={filterByCategory}
              open={dropdownCategoriesOpen}
              onClose={() => handleDropdownClose("categories")}
              onOpen={() => handleDropdownOpen("categories")}
              onChange={(e: any) => {
                handleDropdownChange("categories", e);
              }}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {categoryOptions?.map(
                (category: { title: string; slug: string }) => (
                  <MenuItem key={category.slug} value={category.slug}>
                    <Checkbox
                      checked={filterByCategory.indexOf(category.slug) > -1}
                    />
                    <ListItemText primary={category.title} />
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </div>
      </Stack>
    </StyleWrapper>
  );
}
